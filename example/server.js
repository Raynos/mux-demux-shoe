var http = require('http')
    , path = require("path")
    , browserifyServer = require("browserify-server")
    , shoe = require("..")

var handler = browserifyServer(path.join(__dirname, "static"))
    , server = http.createServer(handler).listen(8080)
    , sock = shoe(handleStream)

sock.install(server, "/shoe")

function handleStream(stream) {
    // stream from MuxDemux with the meta property set
    if (stream.meta === "one") {
        stream.on("data", console.log.bind(console))
    }
    stream.write("oh hi there")
}