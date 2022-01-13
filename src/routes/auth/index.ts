import express from 'express'
import passport from 'passport'
import './passport/google'
import './passport/local'
import './passport/github'

import AuthController from '@controllers/authController'
const router = express.Router()

// google routes
router.get(
	'/login/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/login/google/callback',
	passport.authenticate('google'),
	new AuthController().handleOauth
)

// github routes
router.get(
	'/login/github',
	passport.authenticate('github', { scope: ['profile', 'email'] })
)

router.get(
	'/login/github/callback',
	passport.authenticate('github'),
	new AuthController().handleOauth
)

router.post(
	'/login/local',
	passport.authenticate('local', { failureRedirect: '/' }),
	new AuthController().getLocalToken
)

router.post('/register', new AuthController().register)

export default router
