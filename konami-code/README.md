# KonamiCode
Little script that adds an eastern egg to your page.  
Just try pressing ** ↑ ↑ ↓ ↓ ← → ← → B A **

## How to use
1. Include the script in your page
```html
<script src="konami.js"></script>
```
2. Create a new instance of the KonamiCode class
```javascript
var konami = new KonamiCode();
```
3. Add the event listener
```javascript
document.addEventListener('kcUpdate', update_view);
document.addEventListener('kcCancel', reset_view);
document.addEventListener('kcComplete', callback);
```
