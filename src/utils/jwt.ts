import jwt from 'jsonwebtoken'
import config from '@config/index'

export const generateToken = async payload => {
	return await jwt.sign(payload, config.JWT_SECRET)
}

export const verifyToken = async token => {
	return await jwt.verify(token, config.JWT_SECRET)
}
