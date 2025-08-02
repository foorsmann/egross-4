// Clamp cart payloads to available inventory before sending to Shopify endpoints
(function(){
  const inventoryCache = new Map();
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
    items = items.filter(it=>it.quantity>0);
    if(isForm){
      const fd = new FormData();
      const singleId = payload.get('id');
      if(singleId){
        if(items[0]){
          fd.append('id', items[0].id);
          fd.append('quantity', items[0].quantity);
        }
        for(const [k,v] of entries){
          if(k!=='id' && k!=='quantity') fd.append(k,v);
        }
      }else{
        const validIdx = new Set(items.map(it=>String(it.index)));
        for(const [k,v] of entries){
          const m = k.match(/^items\[(\d+)\]\[(id|quantity)\]$/);
          if(m){
            const idx=m[1], prop=m[2];
            if(!validIdx.has(idx)) continue;
            const item = items.find(it=>String(it.index)===idx);
            if(prop==='quantity') fd.append(k,item.quantity);
            else if(prop==='id') fd.append(k,item.id);
          }else{
            fd.append(k,v);
          }
        }
      }
      payload = fd;
    }else if(isArray){
      payload = items;
    }else if(typeof payload==='object' && payload){
      if(Array.isArray(payload.items)){
        payload = {...payload, items};
      }else if(payload.updates && typeof payload.updates==='object'){
        const updates={};
        items.forEach(it=>{updates[it.id]=it.quantity;});
        payload = {...payload, updates};
      }else if(payload.id){
        if(items[0]){
          payload = {...payload, id:items[0].id, quantity:items[0].quantity};
        }else{
          payload = {...payload};
          delete payload.id;
          delete payload.quantity;
        }
      }
    }
    if(over.length){
      window.dispatchEvent(new CustomEvent('cart:clamped',{detail:over}));
    }
    return payload;
  }
  window.clampCartPayload = clampCartPayload;
  const _fetch = window.fetch.bind(window);
  window.fetch = async function(resource, config={}){
    const url = typeof resource === 'string' ? resource : resource.url;
    if(url && (/\/cart\/add\.js/.test(url) || /\/cart\/change\.js/.test(url)) && config.body){
      const mode = /\/cart\/add\.js/.test(url) ? 'add' : 'change';
      if(config.body instanceof FormData){
        config.body = await clampCartPayload(config.body, mode);
      }else if(typeof config.body === 'string'){
        try{
          const json = JSON.parse(config.body);
          config.body = JSON.stringify(await clampCartPayload(json, mode));
        }catch(e){}
      }else if(typeof config.body === 'object'){
        const newPayload = await clampCartPayload(config.body, mode);
        config.body = JSON.stringify(newPayload);
        if(config.headers instanceof Headers){
          if(!config.headers.has('Content-Type')) config.headers.set('Content-Type','application/json');
        }else{
          config.headers = Object.assign({}, config.headers, {'Content-Type':'application/json'});
        }
      }
    }
    return _fetch(resource, config);
  };
})();
