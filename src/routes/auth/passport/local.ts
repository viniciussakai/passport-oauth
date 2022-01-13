import User from '@entities/User'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

passport.use(
	'local',
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await userValidation(username, password)
			done(null, user)
		} catch (err) {
			done(err)
		}
	})
)

const userValidation = async (username, password) => {
	const user = await User.findOne({ username: username }).select('+password')

	if (user && user.password) {
		const passswordMatch = await bcrypt.compare(password, user.password)

		if (passswordMatch) {
			return user
		} else {
			return new Error()
		}
	}
}

passport.serializeUser(function (user: any, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id: any, done) {
	done(null, id)
})
