// event stream ~_~
window.Buffer = require("buffer").Buffer

var shoe = require("shoe")
    , MuxDemux = require("mux-demux")

module.exports = createMdmStream

function createMdmStream(uri) {
    var mdm = MuxDemux({
            error: false
        })
        , stream = shoe(uri)

    stream.on("connect", onconnect)

    mdm.pipe(stream).pipe(mdm)

    // bubble mux-demux error into stream
    mdm.on("error", bubbleError)

    return mdm

    function onconnect() {
        mdm.emit("connect")
    }

    function bubbleError(err) {
        stream.emit("error", err)
    }
}