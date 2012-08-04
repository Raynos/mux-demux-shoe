var shoe = require("shoe")
    , MuxDemux = require("mux-demux")

module.exports = createMdmStream

function createMdmStream(uri) {
    var mdm = MuxDemux({
            error: false
        })
        , stream = shoe(uri)

    stream.on("connect", onconnect)

    stream.on("end", onend)

    mdm.pipe(stream).pipe(mdm)

    return mdm

    function onconnect() {
        mdm.emit("connect")
    }

    function onend() {
        mdm.emit("end")
    }
}