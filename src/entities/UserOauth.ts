import { Document, Schema, model } from 'mongoose'

interface UserOauthInterface extends Document {
	user_id: string
	provider: string
	subject: string
}

const UserOauthSchema = new Schema(
	{
		user_id: {
			type: String,
			required: true
		},
		provider: {
			type: String,
			required: true
		},
		subject: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

// Compile model from schema
export default model<UserOauthInterface>('UserOauth', UserOauthSchema)
