// double-qty.js - Doar funcționalitate, fără injectare buton
// Autor: Saga Media / Egross
// Asigură funcționalitatea butonului care adaugă cantitatea minimă (pasul minim) pe orice element cu clasa .double-qty-btn existent în pagină

(function(){
  // Funcție comună pentru validare și highlight roșu la atingerea stocului
  function snapDown(val, step, min){
    if(!isFinite(val)) return min;
    if(val < min) return min;
    return Math.floor((val - min) / step) * step + min;
  }

  function clampAndSnap(val, step, min, max, snap){
    val = Math.min(val, max);
    if(val < min) val = min;
    if(snap && val !== max){
      val = snapDown(val, step, min);
    }
    return val;
  }

  function validateAndHighlightQty(input){
    var step = parseInt(input.getAttribute('data-min-qty'), 10) || parseInt(input.step,10) || 1;
    var max = input.max ? parseInt(input.max, 10) : Infinity;
    var val = parseInt(input.value, 10);
    if(isNaN(val)) val = 1;
    val = clampAndSnap(val, step, 1, max, false);
    input.value = val;
    if(val >= max){
      input.classList.add('text-red-600');
      input.style.color = '#e3342f';
    }else{
      input.classList.remove('text-red-600');
      input.style.color = '';
    }
    return val;
  }

  // Actualizează starea butoanelor +/- în funcţie de valoarea curentă
  function updateQtyButtonsState(input){
    var container = input.closest('.quantity-input') || input.parentNode;
    if(!container) return;
    var plus = container.querySelector('[data-quantity-selector="increase"],[data-qty-change="inc"]');
    var minus = container.querySelector('[data-quantity-selector="decrease"],[data-qty-change="dec"]');

    var max = input.max ? parseInt(input.max, 10) : Infinity;
    var step = parseInt(input.getAttribute('data-min-qty'), 10) || parseInt(input.step,10) || 1;
    var minQty = step;
    var val = parseInt(input.value, 10);
    if(isNaN(val)) val = 1;

    if(plus) plus.disabled = isFinite(max) && val >= max;
    if(minus){
      // minus devine inactiv când valoarea curentă nu poate scădea sub minQty
      minus.disabled = val <= minQty && ((val - minQty) % step === 0);
    }
  }

  // păstrăm pentru compatibilitate cu codul existent
  var updateIncreaseBtnState = updateQtyButtonsState;

  window.validateAndHighlightQty = validateAndHighlightQty;
  // expunem helperii pentru a putea fi folosiți și în cart/drawer
  window.updateQtyButtonsState = updateQtyButtonsState;
  window.adjustQuantityHelper = adjustQuantity;

var BUTTON_CLASS = 'double-qty-btn';


  function applyMinQty(){
    document.querySelectorAll('[data-min-qty]').forEach(function(input){
      var min = parseInt(input.getAttribute('data-min-qty'), 10);
      if(min && min > 0){
        if(input.closest('.scd-item') || input.closest('[data-cart-item]')){
          input.min = min;
        }else{
          input.min = 1; // allow manual values down to 1 on product page
        }
        input.step = min;
        if(parseInt(input.value,10) < min){
          input.value = min;
        }
        validateAndHighlightQty(input);
        updateQtyButtonsState(input);
      }
    });
  }

  function syncOtherQtyInputs(changedInput){
    var productId = changedInput.dataset.productId;
    if(!productId) return;
    var value = changedInput.value;
    document.querySelectorAll('input[data-product-id="' + productId + '"][data-quantity-input]').forEach(function(input){
      if(input === changedInput) return;
      if(input.value !== value){
        input.value = value;
        validateAndHighlightQty(input);
        updateQtyButtonsState(input);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  function attachQtyInputListeners(){
    var selectors = '.quantity-input__element, .scd-item__qty_input, input[data-quantity-input]';
    document.querySelectorAll(selectors).forEach(function(input){
      if(input.dataset.qtyListener) return;
      input.dataset.qtyListener = '1';
      ['input','change','blur'].forEach(function(ev){
        input.addEventListener(ev, function(){
          validateAndHighlightQty(input);
          updateQtyButtonsState(input);
          syncOtherQtyInputs(input);
        });
      });
      input.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
          validateAndHighlightQty(input);
          updateQtyButtonsState(input);
          syncOtherQtyInputs(input);
        }
      });
      validateAndHighlightQty(input);
      updateQtyButtonsState(input);
      syncOtherQtyInputs(input);
    });
  }

  // Nu validăm logică pentru cart/drawer (lăsăm tema să o gestioneze separat!)
  var qtyBtnListenerAdded = false;
  function attachQtyButtonListeners(){
    if(qtyBtnListenerAdded) return;
    qtyBtnListenerAdded = true;
    document.addEventListener('click', function(e){
      var btn = e.target.closest('[data-quantity-selector],[data-qty-change]');
      if(!btn) return;

      // Nu interferăm cu butoanele din cart/drawer – tema le gestionează!
      if(btn.closest('.scd-item') || btn.closest('[data-cart-item]')) return;

      var container = btn.closest('.quantity-input') || btn.parentNode;
      var input = container.querySelector('input[type="number"]');
      if(input){
        var before = input.value;
        setTimeout(function(){
          var action = btn.getAttribute('data-quantity-selector') || btn.getAttribute('data-qty-change');
          if(action === 'increase' || action === 'inc'){
            adjustQuantity(input, 1, before);
          }else if(action === 'decrease' || action === 'dec'){
            adjustQuantity(input, -1, before);
          }else{
            validateAndHighlightQty(input);
            updateQtyButtonsState(input);
          }
        }, 0);
      }
    }, true);
  }

  function adjustQuantity(input, delta, baseVal){
    var step = parseInt(input.getAttribute('data-min-qty'), 10) || 1;
    var max = input.max ? parseInt(input.max, 10) : Infinity;
    var minQty = step; // valoarea minimă configurată
    var val = baseVal !== undefined ? parseInt(baseVal,10) : parseInt(input.value, 10);
    if(isNaN(val)) val = 1;

    // Dacă suntem la maxim, doar validează și colorează
    if(delta > 0 && isFinite(max) && val >= max){
      validateAndHighlightQty(input);
      updateQtyButtonsState(input);
      return;
    }

    if(delta < 0){
      // Snap la multiplu inferior plecând de la minQty
      if((val - minQty) % step !== 0){
        val = Math.floor((val - minQty) / step) * step + minQty;
      }else{
        val -= step;
      }
      if(val < minQty) val = minQty;
    }else{
      // Snap la multiplu superior plecând de la minQty
      if((val - minQty) % step !== 0){
        val = Math.ceil((val - minQty) / step) * step + minQty;
      }else{
        val += step;
      }
      if(val > max) val = max;
    }

    var newVal = clampAndSnap(val, step, 1, max);
    input.value = newVal;
    if(newVal >= max){
      input.classList.add('text-red-600');
      input.style.color = '#e3342f';
    }else{
      input.classList.remove('text-red-600');
      input.style.color = '';
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    updateQtyButtonsState(input);
  }

  function findQtyInput(btn) {
    let wrapper = btn.previousElementSibling;
    if (wrapper && wrapper.classList && wrapper.classList.contains('quantity-input')) {
      let input = wrapper.querySelector('input[type="number"]');
      if (input) return input;
    }
    if (btn.previousElementSibling && btn.previousElementSibling.tagName === 'INPUT') {
      return btn.previousElementSibling;
    }
    return btn.parentNode.querySelector('input[type="number"]');
  }

  function initDoubleQtyButtons() {
    document.querySelectorAll('.' + BUTTON_CLASS).forEach(function(btn){
      var input = findQtyInput(btn);
      if (!input) return;
      var min = parseInt(input.getAttribute('data-min-qty'), 10) || 1;
      var template = btn.getAttribute('data-label-template') || btn.textContent;
      var label = template.replace('{min_qty}', min);
      btn.setAttribute('aria-label', label);
      btn.textContent = label;

      if (btn.dataset.doubleQtyActive) return;
      btn.dataset.doubleQtyActive = '1';

      function updateBtnState() {
        var max = input.max ? parseInt(input.max, 10) : 9999;
        var val = parseInt(input.value, 10) || 1;
        btn.disabled = val >= max;
        validateAndHighlightQty(input);
        updateQtyButtonsState(input);
      }
      updateBtnState();
      input.addEventListener('input', updateBtnState);
      input.addEventListener('change', updateBtnState);

      btn.addEventListener('click', function(e){
        e.preventDefault();
        adjustQuantity(input, 1);
        updateBtnState();
      });

      btn.addEventListener('focus', function(){ btn.classList.add('focus'); });
      btn.addEventListener('blur', function(){ btn.classList.remove('focus'); });
    });
  }

  function initAll(){
    applyMinQty();
    initDoubleQtyButtons();
    attachQtyInputListeners();
    attachQtyButtonListeners();
  }
  document.addEventListener('DOMContentLoaded', initAll);
  window.addEventListener('shopify:section:load', initAll);
  window.addEventListener('shopify:cart:updated', initAll);
  window.addEventListener('shopify:product:updated', initAll);

  window.doubleQtyInit = initDoubleQtyButtons;
})();








