import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { userProfile } from '@utils/oathuser'
import config from '@config/index'

passport.use(
	'github',
	new GitHubStrategy(
		{
			clientID: config.GITHUB_CLIENT_ID,
			clientSecret: config.GITHUB_CLIENT_SECRET,
			callbackURL: config.GITHUB_CALLBACK_URL
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, userProfile(profile))
		}
	)
)

passport.serializeUser(function (user: any, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id: any, done) {
	done(null, id)
})
