const sendkeys = require('./sendkeys-js');
const { performance } = require('perf_hooks');

async function doit() {
    var t0 = performance.now();
    // for mac
    await sendkeys.send('A');
    var t1 = performance.now();
    console.log(`Keypress took ${(t1 - t0).toFixed()}ms`);
}

setInterval(doit, 1000);

