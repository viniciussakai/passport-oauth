import mongoose from 'mongoose'
import config from '@config/index'

class Database {
	public initConnection() {
		return mongoose
			.connect(
				`mongodb://${config.MONGO_SERVER}:${config.MONGO_PORT}/${config.MONGO_DB}`
			)
			.then(() => {
				console.log('[moongoose] connection estabilised successful')
			})
			.catch(err => {
				console.log(`[moongoose] connection failed: ${err}`)
			})
	}
}

export default new Database()
