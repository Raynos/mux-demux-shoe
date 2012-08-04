# mux-demux-shoe

A mux demux connection through shoe!

## Example Server

    var shoe = require("mux-demux-shoe")

    var sock = shoe(function (stream) {
        // stream from MuxDemux with the meta property set
        if (stream.meta === "one") {
            stream.on("data", console.log.bind(console))
        }
    })

    sock.install(someHttpServer, "/shoe")

## Example client

    var shoe = require("mux-demux-shoe")
        , mdm = shoe("/shoe")

    var one = mdm.createStream("one")

    one.write("hello world")

## Installation

`npm install mux-demux-shoe`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/mux-demux-shoe.png
  [2]: http://travis-ci.org/Raynos/mux-demux-shoe