export type AccountProfile = {
	id: string
	name: string
	email: string
	avatar?: string
	language: string
	location: string
}

export const ACCOUNT_PROFILE: AccountProfile = {
	id: 'u1',
	name: 'Rick',
	email: 'rick@example.com',
	avatar: 'https://picsum.photos/200',
	language: 'en',
	location: 'Thailand',
}
