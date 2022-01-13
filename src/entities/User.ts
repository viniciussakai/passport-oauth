import { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserInterface extends Document {
	email: string
	password?: string
	name?: string
	image?: string
	provider?: string
}

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: false,
			select: false
		},
		name: {
			type: String,
			required: false
		},
		image: {
			type: String,
			required: false
		},
		provider: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
)

UserSchema.pre<UserInterface>('save', async function (next) {
	if (this.password !== undefined) {
		const passwordHash = await bcrypt.hash(this.password, 10)
		this.password = passwordHash
		return next()
	} else {
		return next()
	}
})

// Compile model from schema
export default model<UserInterface>('User', UserSchema)
