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

    stream.on("end", finish)
    stream.on("close", finish)
    mdm.on("end", finish)
    mdm.on("close", finish)

    mdm.pipe(stream).pipe(mdm)

    return mdm

    function onconnect() {
        mdm.emit("connect")
    }

    function finish() {
        if (!mdm.ended) {
            mdm.end()
        }
        if (!stream.ended) {
            stream.end()
        }

        stream.removeListener("end", finish)
        stream.removeListener("close", finish)
        mdm.removeListener("end", finish)
        mdm.removeListener("close", finish)
    }
}