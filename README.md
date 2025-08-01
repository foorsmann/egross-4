# Documentatie utilizare inputuri de cantitate

Acest proiect foloseste `double-qty.js` pentru functionalitatile suplimentare ale campurilor de cantitate.

## Initializare

Scriptul ataseaza automat evenimentele necesare la incarcarea paginii (`DOMContentLoaded`) si la evenimentele Shopify `shopify:section:load`, `shopify:cart:updated` si `shopify:product:updated`.

Daca elemente cu inputuri de cantitate sunt adaugate dinamic (ex. modul quick view, sticky ATC sau prin incarcari AJAX), apelati:

```javascript
window.doubleQtyInit();
```

Functia va reinitializeaza butoanele si inputurile pentru zonele nou adaugate.
