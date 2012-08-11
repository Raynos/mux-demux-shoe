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

    // if anything ends clean everything up. This bubbles the disconnect
    // upto boot so that boot can try reconnecting
    stream.on("end", cleanup)
    stream.on("close", cleanup)
    mdm.on("end", cleanup)
    mdm.on("close", cleanup)

    return mdm

    function onconnect() {
        mdm.emit("connect")
    }

    function cleanup() {
        if (!mdm.ended) {
            mdm.end()
        }
        if (!stream.ended) {
            stream.end()
        }

        mdm.destroy && mdm.destroy()
        stream.destroy && stream.destroy()

        mdm.removeListener("end", cleanup)
        mdm.removeListener("close", cleanup)
        stream.removeListener("end", cleanup)
        stream.removeListener("close", cleanup)
    }
}