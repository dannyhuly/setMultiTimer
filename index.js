window.multiTimerList = [];
window.multiTimerQueued = null;

window.setMultiTimerTick = function () {
    // stop condition
    if (!window.multiTimerQueued) {
        return;
    }

    window.setSingleTimer(function () {
        // run cb
        window.multiTimerQueued.callback();

        // queue next cb
        window.multiTimerQueued = window.multiTimerList.pop() || null;
        window.setMultiTimerTick();
    }, Date.now() - window.multiTimerQueued.time);
}

window.setMultiTimer = function (callback, time) {

    var newTimeoutCb = {
        callback: callback,
        time: Date.now() + time
    };

    // case 1
    if (!window.multiTimerQueued) {
        console.log("case 1: empty list (start mechanism till \"multiTimerList\" is empty)");
        window.multiTimerQueued = newTimeoutCb;
        window.setMultiTimerTick();
        return;
    }

    // case 2
    if (newTimeoutCb.time < window.multiTimerQueued.time) {
        console.log("case 2: new cb should run before queued cb");
        window.multiTimerList.unshift(window.multiTimerQueued);
        window.multiTimerQueued = newTimeoutCb;
        return;
    }

    // case 3
    console.log("case 3: new cb should run in the future (add to \"multiTimerList\" and sort)");
    window.multiTimerList.push(newTimeoutCb)
    window.multiTimerList.sort(function (a, b) {
        return a.time < b.time ? 1 : -1;
    });

};

window.pageLoaded = function () {
    // these should print "3", "1", "2" to the console
    // window.setMultiTimer(() => console.log("1"), 200);
    // window.setMultiTimer(() => console.log("2"), 300);
    // window.setMultiTimer(() => console.log("3"), 100);

    /**
     * - output should be ordered starting with the smallest time
     * - cbs with the same time aren't guaranteed to be ordered
     */
    window.setMultiTimer(() => window.print("200"), 200);
    window.setMultiTimer(() => window.print("299"), 299);
    window.setMultiTimer(() => window.print("300-c"), 300);
    window.setMultiTimer(() => window.print("300-b"), 300);
    window.setMultiTimer(() => window.print("100"), 100);
    window.setMultiTimer(() => window.print("300-a"), 300);
    window.setMultiTimer(() => window.print("301"), 301);
    window.setMultiTimer(() => window.print("10"), 10); // first
    window.setMultiTimer(() => window.print("5000"), 5000); // last
};
