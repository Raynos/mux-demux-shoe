var http = require('http')
    , path = require("path")
    , browserify = require("browserify")

var server = http.createServer(function (req, res) {
    if (req.url === "/bundle.js") {
        var b = browserify()
        b.addEntry(path.join(__dirname, "./client.js"))
        res.end(b.bundle())
    } else {
        res.end("<script src='bundle.js'></script>")
    }
})
server.listen(8082)

var shoe = require("..")

var sock = shoe(function (stream) {
    // stream from MuxDemux with the meta property set
    if (stream.meta === "one") {
        stream.on("data", console.log.bind(console))
    }
})

sock.install(server, "/shoe")