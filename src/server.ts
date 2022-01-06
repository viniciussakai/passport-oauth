import { handleError } from '@errors/errorHandler'
import express from 'express'
import mongodb from './database/mongodb'

import passport from 'passport'
import session from 'express-session'
import routes from './routes'

class Server {
	#express: express.Express

	constructor() {
		this.#express = express()
		this.initMongo()
		this.middlewares()
		this.routes()
		this.errors()
	}

	get express(): express.Express {
		return this.#express
	}

	private middlewares(): void {
		this.express.use(
			session({
				secret: 'slasdfgsgfdggf',
				resave: false,
				saveUninitialized: false
			})
		)

		this.express.use(passport.initialize())
		this.express.use(passport.session())
	}

	private initMongo(): void {
		mongodb.initConnection()
	}

	private routes(): void {
		this.express.use('/', routes)
	}

	private errors(): void {
		this.express.use((err, req, res, next) => {
			if (!err) next()

			return handleError(err, res)
		})
	}
}

export default Server
