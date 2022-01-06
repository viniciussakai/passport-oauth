import http from 'http'
import config from './config'
import Server from './server'

const port = config.APP_PORT

const app = new Server().express

const server = http.createServer(app)

server.listen(port, () => {
	console.log(`[server] Running on port ${port}`)
})
