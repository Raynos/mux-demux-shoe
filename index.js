var shoe = require("shoe")
    , MuxDemux = require("mux-demux")

module.exports = createShoeConnection

function createShoeConnection(options, callback) {
    if (typeof options === 'function') {
        callback = options
        options = {}
    }

    return shoe(options, interceptStream)

    function interceptStream(stream) {
        var mdm = MuxDemux({
            error: false
        })

        mdm.on("connection", callback)

        stream.pipe(mdm).pipe(stream)
    }
}