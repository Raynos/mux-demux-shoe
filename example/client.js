var shoe = require('../browser.js')
    , mdm = shoe("/shoe")

var one = mdm.createStream("one")

mdm.on("connect", function () {
    one.write('die here too')
})

one.on("data", function (msg) {
    console.log("data", msg)
})

one.write("hello world")