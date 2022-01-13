import 'dotenv/config'

export default {
	APP_PORT: process.env.PORT || 3333,
	APP_SESSION_SECRET: process.env.SESSION_SECRET || '',

	MONGO_SERVER: process.env.MONGO_SERVER || '',
	MONGO_USER: process.env.MONGO_URL || '',
	MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
	MONGO_DB: process.env.MONGO_DB || '',
	MONGO_PORT: process.env.MONGO_PORT || '',

	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
	GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '',

	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
	GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || '',

	JWT_SECRET: process.env.JWT_SECRET || ''
}
