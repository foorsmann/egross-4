/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./src/js/pages/product/product-form.js


if (!customElements.get("product-form")) {
  customElements.define("product-form", class ProductForm extends HTMLElement {
    constructor() {
      super();

      _defineProperty(this, "toggleSpinner", show => {
        const method = show ? "add" : "remove";
        this.form.closest(".product-form").classList[method]("adding");
      });

      this.selectors = {
        form: "form",
        inputId: "[name=id]",
        submitButton: '[name="add"]',
        errorWrapper: ".prod__form-error",
        customFields: ["[data-product-custom-field]"],
        dynamicCheckout: ".prod__dynamic_checkout"
      };
      this.domNodes = queryDomNodes(this.selectors, this);
      this.form = this.domNodes.form;
      this.submitButton = this.domNodes.submitButton;
      this.domNodes.inputId.disabled = false;
      this.notificationType = this.dataset.notificationType;
      this.customFields = document.querySelectorAll(this.selectors.customFields);
      if (this.domNodes.dynamicCheckout) this.enable_dynamic_checkout = true;
      this.form.addEventListener("submit", this.onSubmitHandler.bind(this));

      if (this.domNodes.dynamicCheckout && this.customFields) {
        this.domNodes.dynamicCheckout.addEventListener('click', e => {
          const missing = validateForm(this.form.closest(".main-product__blocks"));

          if (missing.length > 0) {
            e.stopPropagation();
            window.ConceptSGMTheme.Notification.show({
              target: this.domNodes.errorWrapper,
              method: 'appendChild',
              type: 'warning',
              message: window.ConceptSGMStrings.requiredField,
              delay: 100
            });
          }
        }, true);
      }
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      this.toggleSpinner(true);
      const missing = validateForm(this.form.closest(".main-product__blocks"));

      if (missing?.length > 0) {
        /* Missing field warnings removed */
        this.toggleSpinner(false);
        return window.ConceptSGMTheme.Notification.show({
          target: this?.domNodes?.errorWrapper,
          method: "appendChild",
          type: "warning",
          message: window.ConceptSGMStrings.requiredField
        });
      }

      const config = {
        method: "POST",
        headers: {
          Accept: "application/javascript",
          "X-Requested-With": "XMLHttpRequest"
        }
      };
      const formData = new FormData(this.form);
      config.body = formData;
      const {
        ConceptSGMSettings,
        ConceptSGMStrings
      } = window;

      if (ConceptSGMSettings.use_ajax_atc) {
        fetch(`${ConceptSGMSettings.routes.cart_add_url}`, config)
          .then(async r => {
            let body;
            try {
              const ct = r.headers.get('content-type');
              if (ct && ct.includes('application/json')) {
                body = await r.json();
              } else {
                const text = await r.text();
                body = { message: text };
              }
            } catch (err) {
              body = {};
            }
            return { statusCode: r.status, body };
          })
          .then(({ statusCode, body }) => {
            if (statusCode >= 400 || body.status) {
              let msg = body.description || body.message || body.errors || window.ConceptSGMStrings.cartError;
              if (statusCode === 429) {
                msg = 'Ati trimis prea multe cereri. Va rugam sa incercati din nou mai tarziu.';
              }
              return window.ConceptSGMTheme.Notification.show({
                target: this.notificationType === "toast" ? document.body : this.domNodes.errorWrapper,
                method: "appendChild",
                type: "warning",
                message: msg,
                last: 3000,
                sticky: this.notificationType === "toast"
              });
            }

            if (!ConceptSGMSettings.enable_cart_drawer) {
              window.ConceptSGMTheme.Notification.show({
                target: this.domNodes.errorWrapper,
                method: "appendChild",
                type: "success",
                message: window.ConceptSGMStrings.itemAdded,
                last: 3000,
                sticky: this.notificationType === "toast"
              });
            }

            window.ConceptSGMEvents.emit(`ON_ITEM_ADDED`, body);
            window.Shopify.onItemAdded(body);
          })
          .catch(() => {})
          .finally(() => {
            this.toggleSpinner(false);
          });
      } else {
        this.form.submit();
      }
    }

  });
}
/******/ })()
;