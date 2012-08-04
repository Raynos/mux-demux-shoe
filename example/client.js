var shoe = require('../browser.js')
    , mdm = shoe("/shoe")

var one = mdm.createStream("one")

one.write("hello world")