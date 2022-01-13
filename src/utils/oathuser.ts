interface IOauthEmail {
	value: string
	verified: boolean
}

interface IOauthPhotos {
	value: string
}

interface IOauthUser {
	id: string
	emails: IOauthEmail[]
	name?: { familyName: string; givenName: string }
	username?: string
	photos: IOauthPhotos[]
	displayName?: string
	provider: string
}

export const userProfile = (profile: IOauthUser) => {
	const { id, name, emails, photos, provider, displayName, username } = profile

	let firstName
	let lastName
	let image
	let newName
	let newUsername

	if (emails && emails.length) newUsername = emails[0].value

	if (name) {
		if (name.givenName) firstName = name.givenName
		if (name.familyName) lastName = name.familyName
		newName = `${firstName} ${lastName}`
	}

	if (photos && photos.length) image = photos[0].value
	if (displayName) newName = displayName
	if (username) newUsername = username

	return {
		id,
		username: newUsername,
		name: newName,
		image,
		provider
	}
}
