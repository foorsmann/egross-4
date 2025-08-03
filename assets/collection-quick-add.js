// collection-quick-add.js - izolat pentru cardurile din colecție
(function(){
  function snapDown(val, step, min){
    if(!isFinite(val)) return min;
    if(val < min) return min;
    return Math.floor((val - min) / step) * step + min;
  }
  function clamp(val, step, min, max){
    val = Math.min(val, max);
    if(val < min) val = min;
    if((val - min) % step !== 0 && val !== max){
      val = snapDown(val, step, min);
    }
    return val;
  }
  function validate(input){
    if(input.value === '') return;
    var step = parseInt(input.dataset.collectionMinQty,10) || parseInt(input.step,10) || 1;
    var min = step;
    var max = input.max ? parseInt(input.max,10) : Infinity;
    var val = parseInt(input.value,10);
    if(isNaN(val)) val = min;
    val = clamp(val, step, min, max);
    input.value = val;
    if(val >= max){
      input.classList.add('text-red-600');
      input.style.color = '#e3342f';
    } else {
      input.classList.remove('text-red-600');
      input.style.color = '';
    }
    return val;
  }
  function updateButtons(input){
    var wrap = input.closest('collection-quantity-input');
    if(!wrap) return;
    var plus = wrap.querySelector('[data-collection-quantity-selector="increase"]');
    var minus = wrap.querySelector('[data-collection-quantity-selector="decrease"]');
    var step = parseInt(input.dataset.collectionMinQty,10) || 1;
    var min = step;
    var max = input.max ? parseInt(input.max,10) : Infinity;
    var val = parseInt(input.value,10) || 0;
    if(plus) plus.disabled = val >= max;
    if(minus) minus.disabled = val <= min;
  }
  function syncInputs(changed){
    var pid = changed.dataset.collectionProductId;
    if(!pid) return;
    document.querySelectorAll('input[data-collection-product-id="'+pid+'"][data-collection-quantity-input]').forEach(function(inp){
      if(inp === changed) return;
      inp.value = changed.value;
      validate(inp);
      updateButtons(inp);
    });
  }
  function attachInputListeners(){
    document.querySelectorAll('input[data-collection-quantity-input]').forEach(function(input){
      if(input.dataset.collectionQtyListener) return;
      input.dataset.collectionQtyListener = '1';
      ['input','change','blur'].forEach(function(ev){
        input.addEventListener(ev,function(){
          validate(input);
          updateButtons(input);
          syncInputs(input);
        });
      });
      input.addEventListener('keypress',function(e){
        if(e.key === 'Enter'){
          validate(input);
          updateButtons(input);
          syncInputs(input);
        }
      });
      validate(input);
      updateButtons(input);
    });
  }
  function adjustQuantity(input, dir){
    var step = parseInt(input.dataset.collectionMinQty,10) || 1;
    var min = step;
    var max = input.max ? parseInt(input.max,10) : Infinity;
    var val = parseInt(input.value,10) || min;
    val = dir === 'increase' ? val + step : val - step;
    val = clamp(val, step, min, max);
    input.value = val;
    validate(input);
    updateButtons(input);
    syncInputs(input);
    input.dispatchEvent(new Event('change',{bubbles:true}));
  }
  function attachButtonListeners(){
    document.addEventListener('click',function(e){
      var btn = e.target.closest('[data-collection-quantity-selector]');
      if(!btn) return;
      var wrap = btn.closest('collection-quantity-input');
      var input = wrap ? wrap.querySelector('input[data-collection-quantity-input]') : null;
      if(!input) return;
      var action = btn.getAttribute('data-collection-quantity-selector');
      adjustQuantity(input, action);
    });
  }
  function initDoubleQtyButtons(){
    document.querySelectorAll('[data-collection-double-qty]').forEach(function(btn){
      var template = btn.getAttribute('data-collection-label-template') || btn.textContent;
      var min = parseInt(btn.getAttribute('data-collection-original-min-qty'),10) || 1;
      var wrap = btn.closest('.collection-qty-group');
      var input = wrap ? wrap.querySelector('input[data-collection-quantity-input]') : null;
      if(!input) return;
      function update(){
        var val = parseInt(input.value,10) || 0;
        var max = input.max ? parseInt(input.max,10) : Infinity;
        btn.disabled = val >= max;
        var label = template.replace('{min_qty}', min);
        btn.textContent = label;
        btn.setAttribute('aria-label', label);
      }
      btn.addEventListener('click',function(){
        adjustQuantity(input,'increase');
        update();
      });
      input.addEventListener('input',update);
      input.addEventListener('change',update);
      update();
    });
  }
  function applyCappedState(input){
    input.dataset.prevMin = input.min;
    input.removeAttribute('data-collection-min-qty');
    input.min = 0;
    input.value = 0;
    input.classList.add('text-red-600');
    input.style.color = '#e3342f';
    updateButtons(input);
    var clear = function(){
      input.classList.remove('text-red-600');
      input.style.color = '';
      if(input.dataset.prevMin){ input.min = input.dataset.prevMin; delete input.dataset.prevMin; }
      input.setAttribute('data-collection-min-qty', input.step);
      input.removeEventListener('input',clear);
      input.removeEventListener('change',clear);
    };
    input.addEventListener('input',clear,{once:true});
    input.addEventListener('change',clear,{once:true});
  }
  window.collectionApplyCappedQtyState = applyCappedState;

  attachInputListeners();
  attachButtonListeners();
  initDoubleQtyButtons();

  class CollectionProductForm extends HTMLElement {
    constructor(){
      super();
      this.form = this.querySelector('form');
      this.submitButton = this.querySelector('.collection-add-to-cart');
      this.idInput = this.form ? this.form.querySelector('[name="id"]') : null;
      if(this.idInput){ this.idInput.disabled = false; }
      this.addEventListener('submit', this.onSubmit.bind(this));
    }
    toggleSpinner(show){
      const method = show ? 'add' : 'remove';
      this.classList[method]('adding');
    }
    async onSubmit(e){
      e.preventDefault();
      this.toggleSpinner(true);
      const formData = new FormData(this.form);
      const variantId = parseInt(formData.get('id'),10);
      const qtyInput = this.form.querySelector('input[name="quantity"]');
      const requestedQty = parseInt(formData.get('quantity')) || 1;
      const maxQty = parseInt(qtyInput?.max) || Infinity;
      let cartQty = 0;
      try {
        const cart = await fetch('/cart.js').then(r=>r.json());
        cartQty = cart.items?.find(it=>it.variant_id === variantId)?.quantity || 0;
      } catch(err){ cartQty = 0; }
      const available = Math.max(maxQty - cartQty,0);
      let resetQty = false;
      if(available <= 0){
        window.ConceptSGMTheme?.Notification?.show({type:'warning', message: window.ConceptSGMStrings?.cartLimit});
        this.toggleSpinner(false);
        return;
      }
      if(requestedQty > available){
        formData.set('quantity', available);
        resetQty = true;
      }
      const config = {
        method:'POST',
        headers:{Accept:'application/javascript','X-Requested-With':'XMLHttpRequest'},
        body: formData
      };
      const settings = window.ConceptSGMSettings || {};
      fetch(`${settings.routes?.cart_add_url || '/cart/add'}`, config)
        .then(r=>r.json())
        .then(data=>{
          window.ConceptSGMEvents?.emit('COLLECTION_ITEM_ADDED', data);
          window.Shopify?.onItemAdded?.(data);
          if(resetQty && qtyInput){ applyCappedState(qtyInput); }
        })
        .catch(()=>{})
        .finally(()=>{ this.toggleSpinner(false); });
    }
  }
  if(!customElements.get('collection-product-form')){
    customElements.define('collection-product-form', CollectionProductForm);
  }
})();
