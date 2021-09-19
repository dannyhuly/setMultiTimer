# setMultiTimer -

You have at your disposal the function "setSingleTimer" which is only capable of executing a single function at a future time. Calling "setSingleTimer" multiple times overrides any previous call to the method.

for example, performing the following three calls ends up printing only "3" to the console after 100 ms:

```js
window.setSingleTimer(() => console.log("1"), 100);
window.setSingleTimer(() => console.log("2"), 100);
window.setSingleTimer(() => console.log("3"), 100);
```

Implement the function `window.setSingleTimer` which executes all the callbacks at their correct time in the future. You are only allowed to use `setSingleTimer` for future execution.

> Use of setTimeout, setInterval, etc. is **not** allowed.


```js
// index.js
window.setMultiTimer = function(callback, time) {
    // implement this
};

window.pageLoaded = function() {
    // these should print "3", "1", "2" to the console
    window.setMultiTimer(() => console.log("1"), 200);
    window.setMultiTimer(() => console.log("2"), 300);
    window.setMultiTimer(() => console.log("3"), 100);
};
```