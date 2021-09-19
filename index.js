window.setMultiTimer = function(callback, time) {
    // implement this
};

window.pageLoaded = function() {
    // these should print "3", "1", "2" to the console
    window.setMultiTimer(() => console.log("1"), 200);
    window.setMultiTimer(() => console.log("2"), 300);
    window.setMultiTimer(() => console.log("3"), 100);
};