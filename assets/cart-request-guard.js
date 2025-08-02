// Global guard that clamps cart payloads to inventory before hitting Shopify
// Use `window.clampCartPayload(payload)` before any custom add-to-cart request
(function(){
  const inventoryCache = new Map();

  function extractItems(payload){
    const isForm = payload instanceof FormData;
    const isArray = Array.isArray(payload);
    let entries = [];
    if(isForm){
      entries = Array.from(payload.entries());
    }
    let items = [];
    if(isForm){
      const id = payload.get('id');
      if(id){
        items.push({id, quantity: parseInt(payload.get('quantity')||'1',10), index:null});
      }else{
        const map={};
        for(const [key,val] of entries){
          const m = key.match(/^items\[(\d+)\]\[(id|quantity)\]$/);
          if(m){
            const idx=m[1], prop=m[2];
            map[idx]=map[idx]||{index:idx};
            map[idx][prop]=val;
          }
        }
        items = Object.values(map).map(it=>({id:it.id, quantity:parseInt(it.quantity||'1',10), index:it.index}));
      }
    }else if(isArray){
      items = payload.map(it=>({...it}));
    }else if(typeof payload==='object' && payload){
      if(Array.isArray(payload.items)){
        items = payload.items.map(it=>({...it}));
      }else if(payload.updates && typeof payload.updates==='object'){
        items = Object.entries(payload.updates).map(([id,quantity])=>({id,quantity}));
      }else if(payload.id){
        items = [{id:payload.id, quantity:payload.quantity}];
      }
    }
    return {items, entries, isForm, isArray};
  }

  async function fetchVariantInventory(id){
    if(!inventoryCache.has(id)){
      try{
        const res = await fetch(`/variants/${id}.json`);
        const data = await res.json();
        inventoryCache.set(id, data?.variant?.inventory_quantity ?? 0);
      }catch(e){
        inventoryCache.set(id, 0);
      }
    }
    return inventoryCache.get(id);
  }

  async function getCart(){
    try{
      const res = await fetch('/cart.js');
      return await res.json();
    }catch(e){
      return {items: []};
    }
  }

  async function clampCartPayload(payload, mode='add'){
    const {items, entries, isForm, isArray} = extractItems(payload);
    const cart = await getCart();
    const cartQty={};
    cart.items.forEach(it=>{cartQty[it.id]=it.quantity;});
    const over=[];
    for(const item of items){
      if(!item||!item.id) continue;
      const inv = await fetchVariantInventory(item.id);
      const existing = cartQty[item.id]||0;
      const available = mode==='add'? inv - existing : inv;
      const clamped = Math.max(0, Math.min(Number(item.quantity)||0, available));
      if(clamped !== Number(item.quantity)){
        over.push({id:item.id, requested:item.quantity, clamped});
        item.quantity = clamped;
      }
    }
    const validItems = items.filter(it=>it.quantity>0);

    let newPayload = payload;
    if(isForm){
      const fd = new FormData();
      const singleId = payload.get('id');
      if(singleId){
        if(validItems[0]){
          fd.append('id', validItems[0].id);
          fd.append('quantity', validItems[0].quantity);
        }
        entries.forEach(([k,v])=>{ if(k!=='id' && k!=='quantity') fd.append(k,v); });
      }else{
        const validIdx = new Set(validItems.map(it=>String(it.index)));
        entries.forEach(([k,v])=>{
          const m = k.match(/^items\[(\d+)\]\[(id|quantity)\]$/);
          if(m){
            const idx=m[1], prop=m[2];
            if(!validIdx.has(idx)) return;
            const item = validItems.find(it=>String(it.index)===idx);
            if(prop==='quantity') fd.append(k,item.quantity); else if(prop==='id') fd.append(k,item.id);
          }else{
            fd.append(k,v);
          }
        });
      }
      newPayload = fd;
    }else if(isArray){
      newPayload = validItems;
    }else if(typeof payload==='object' && payload){
      if(Array.isArray(payload.items)){
        newPayload = {...payload, items: validItems};
      }else if(payload.updates && typeof payload.updates==='object'){
        const updates={};
        validItems.forEach(it=>{updates[it.id]=it.quantity;});
        newPayload = {...payload, updates};
      }else if(payload.id){
        if(validItems[0]){
          newPayload = {...payload, id:validItems[0].id, quantity:validItems[0].quantity};
        }else{
          newPayload = {...payload};
          delete newPayload.id;
          delete newPayload.quantity;
        }
      }
    }

    if(over.length){
      window.dispatchEvent(new CustomEvent('cart:clamped',{detail:over}));
    }
    return newPayload;
  }

  clampCartPayload.extractItems = extractItems;
  window.clampCartPayload = clampCartPayload;

  function disableControls(items){
    if(!items) return;
    items.forEach(it=>{
      const ctrls = document.querySelectorAll(`[data-id="${it.id}"]`);
      ctrls.forEach(el=>{
        el.disabled = true;
        setTimeout(()=>{el.disabled=false;},3000);
      });
    });
  }

  async function syncCartUI(){
    try{
      // Sync cu cartul Shopify după 422 – race condition server
      await fetch('/cart/clear.js',{method:'POST'});
      const cart = await getCart();
      cart.items.forEach(it=>{
        document.querySelectorAll(`.scd-item__qty_input[data-id="${it.key}"]`).forEach(inp=>{
          inp.value = it.quantity;
          if(it.variant) inp.max = it.variant.inventory_quantity;
        });
      });
      document.querySelectorAll('.sf-cart-count').forEach(el=>{ el.textContent = cart.item_count; });
      if(typeof window.ConceptSGMTheme !== 'undefined' && window.ConceptSGMTheme.Cart){
        try{
          const cartHTML = await window.ConceptSGMTheme.Cart.fetchCartSection();
          window.ConceptSGMTheme.Cart.cart = cart;
          window.ConceptSGMTheme.Cart.renderNewCart(cartHTML);
        }catch(e){}
      }
      if(window.Shopify && typeof window.Shopify.onCartUpdate==='function'){
        try{ window.Shopify.onCartUpdate(cart, false); }catch(e){}
      }
      if(/\bcart\b/.test(location.pathname)) location.reload();
    }catch(e){}
  }

  function handleInvalid(items){
    disableControls(items);
    syncCartUI();
    window.dispatchEvent(new CustomEvent('cart:invalid',{detail:{items}}));
  }

  const _fetch = window.fetch.bind(window);
  window.fetch = async function(resource, config={}){
    const url = typeof resource === 'string' ? resource : resource.url;
    const method = (config.method || 'GET').toUpperCase();
    if(url && method==='POST' && (/\/cart\/add\.js/.test(url) || /\/cart\/change\.js/.test(url)) && config.body){
      const mode = /\/cart\/add\.js/.test(url) ? 'add' : 'change';
      let items;
      if(config.body instanceof FormData){
        config.body = await clampCartPayload(config.body, mode);
        items = clampCartPayload.extractItems(config.body).items;
      }else if(typeof config.body === 'string'){
        try{
          let json = JSON.parse(config.body);
          json = await clampCartPayload(json, mode);
          items = clampCartPayload.extractItems(json).items;
          config.body = JSON.stringify(json);
        }catch(e){}
      }else if(typeof config.body === 'object'){
        const newPayload = await clampCartPayload(config.body, mode);
        items = clampCartPayload.extractItems(newPayload).items;
        config.body = JSON.stringify(newPayload);
        if(config.headers instanceof Headers){
          if(!config.headers.has('Content-Type')) config.headers.set('Content-Type','application/json');
        }else{
          config.headers = Object.assign({}, config.headers, {'Content-Type':'application/json'});
        }
      }
      return _fetch(resource, config).then(res=>{ if(res.status===422) handleInvalid(items); return res; });
    }
    return _fetch(resource, config);
  };

  const _open = XMLHttpRequest.prototype.open;
  const _send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url){
    this._method = method;
    this._url = url;
    return _open.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function(body){
    const xhr = this;
    const process = async()=>{
      const method = (xhr._method||'').toUpperCase();
      const url = xhr._url || '';
      let items;
      if(method==='POST' && /\/cart\/(add|change)\.js/.test(url) && body){
        const mode = /add\.js/.test(url) ? 'add':'change';
        if(body instanceof FormData){
          body = await clampCartPayload(body, mode);
          items = clampCartPayload.extractItems(body).items;
        }else if(typeof body === 'string'){
          try{
            let json = JSON.parse(body);
            json = await clampCartPayload(json, mode);
            items = clampCartPayload.extractItems(json).items;
            body = JSON.stringify(json);
            xhr.setRequestHeader('Content-Type','application/json');
          }catch(e){}
        }else if(typeof body === 'object'){
          const newPayload = await clampCartPayload(body, mode);
          items = clampCartPayload.extractItems(newPayload).items;
          body = JSON.stringify(newPayload);
          xhr.setRequestHeader('Content-Type','application/json');
        }
        xhr.addEventListener('load', function(){ if(xhr.status===422) handleInvalid(items); });
      }
      _send.call(xhr, body);
    };
    process();
  };

  console.info('clampCartPayload available globally: use before custom add-to-cart requests');
})();
