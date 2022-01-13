import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '@errors/errorHandler'
import { verifyToken } from '@utils/jwt'

interface DecodeUserId {
	id: number
}

const ensureAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return next(new ErrorHandler(401, 'No token provided'))
	}

	const parts = authHeader.split(' ')

	if (!(parts.length === 2)) {
		return next(new ErrorHandler(401, 'Token error'))
	}

	const [schema, token] = parts

	if (!(schema === 'Bearer')) {
		return next(new ErrorHandler(401, 'Token malformed'))
	}

	try {
		const tokenDecode = (await verifyToken(token)) as DecodeUserId
		req.body.userId = tokenDecode.id
		return next()
	} catch (error) {
		return next(new ErrorHandler(401, 'Token incorrect'))
	}
}

export default ensureAuthenticated
