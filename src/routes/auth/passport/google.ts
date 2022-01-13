import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { userProfile } from '@utils/oathuser'
import config from '@config/index'

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_CALLBACK_URL,
			passReqToCallback: true
		},
		(_req: any, _accessToken: any, _refreshToken: any, profile: any, cb: any) =>
			cb(null, userProfile(profile))
	)
)

passport.serializeUser(function (user: any, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id: any, done) {
	done(null, id)
})
