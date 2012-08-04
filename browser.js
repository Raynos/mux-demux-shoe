var shoe = require("shoe")
    , MuxDemux = require("mux-demux")

module.exports = createMdmStream

function createMdmStream(uri) {
    var mdm = MuxDemux()
        , stream = shoe(uri)

    stream.on("connect", onconnect)

    mdm.pipe(stream).pipe(mdm)

    return mdm

    function onconnect() {
        mdm.emit("connect")
    }
}