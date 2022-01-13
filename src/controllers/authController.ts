import User from '@entities/User'
import UserOauth from '@entities/UserOauth'
import ErrorHandler from '@errors/errorHandler'
import { generateToken } from '@utils/jwt'
import { NextFunction, Request, Response } from 'express'

class AuthController {
	async handleOauth(req: Request, res: Response, next: NextFunction) {
		if (!req.user) {
			return next(new ErrorHandler(401, 'Not Authorized'))
		}

		try {
			const userExistsOAuth = await UserOauth.findOne({
				provider: req.user.provider,
				subject: req.user.id
			})

			let user

			if (!userExistsOAuth) {
				user = await User.create({ ...req.user })

				await UserOauth.create({
					user_id: user.id,
					provider: req.user.provider,
					subject: req.user.id
				})
			} else {
				user = await User.findById(userExistsOAuth.user_id)
			}

			if (user) {
				const userData = {
					id: user.id,
					username: user.email,
					image: user.image,
					provider: user.provider
				}

				const token = await generateToken(userData)

				return res.send({ token: token }).end()
			}
		} catch (err) {
			console.log(err)
			return next(new ErrorHandler())
		}
	}

	async register(req: Request, res: Response, next: NextFunction) {
		const { username, password } = req.body

		try {
			const userExists = await User.findOne({ username: username })

			if (userExists) {
				return next(new ErrorHandler(400, 'User Exisits'))
			}

			await User.create({ username, password })

			return res.sendStatus(200)
		} catch (e) {
			console.log(e)
			return next(new ErrorHandler(500, 'error'))
		}
	}

	async getLocalToken(req: Request, res: Response, next: NextFunction) {
		try {
			const user = req.user

			const userData = {
				id: user.id,
				username: user.email,
				image: user.image,
				provider: user.provider
			}

			const token = await generateToken(userData)

			return res.send({ token: token }).end()
		} catch (err) {
			return next(new ErrorHandler())
		}
	}
}

export default AuthController
