const http = require('http')

const app = require('./app/build')


http.createServer(async (req, res) => {
    try {
        await app(req, res)
    } catch (err) {
        res.writeHead(404)
        res.end()
    }
}).listen(8080)