export type OrgSettings = {
	id: string
	name: string
	description: string
	logo?: string
	status: 'draft' | 'pending' | 'verified' | 'suspended'
	createdAt: string
}

export type OrgMember = {
	userId: string
	name: string
	role: 'admin' | 'organizer' | 'member'
	status: 'active' | 'invited' | 'suspended'
}

export const ORG_SETTINGS: OrgSettings = {
	id: 'org-1',
	name: 'Bangkok Dev Community',
	description: 'A community for developers in Bangkok',
	logo: 'https://picsum.photos/200',
	status: 'verified',
	createdAt: '2024-01-01',
}

export const ORG_MEMBERS: OrgMember[] = [
	{
		userId: 'u1',
		name: 'Alice',
		role: 'admin',
		status: 'active',
	},
	{
		userId: 'u2',
		name: 'Bob',
		role: 'organizer',
		status: 'active',
	},
	{
		userId: 'u3',
		name: 'Charlie',
		role: 'member',
		status: 'invited',
	},
]
