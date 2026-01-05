export type Event = {
	id: string
	title: string
	category: string
	date: string
	location: string
	price: number
	cover: string
	description: string
	organizerName: string
}


export const EVENTS: Event[] = [
	{
		id: '1',
		title: 'Bangkok Tech Meetup',
		category: 'Tech',
		date: '2025-04-12',
		location: 'Bangkok',
		price: 0,
		cover: 'https://picsum.photos/1200/400?1',
		description: 'A meetup for developers, startups, and tech enthusiasts.',
		organizerName: 'Bangkok Dev Community',
	},
	{
		id: '2',
		title: 'Live Jazz Night',
		category: 'Music',
		date: '2025-04-18',
		location: 'Bangkok',
		price: 25,
		cover: 'https://picsum.photos/1200/400?2',
		description: 'Enjoy a relaxing night with live jazz performances.',
		organizerName: 'Blue Note Bangkok',
	},
	{
		id: '3',
		title: 'Startup Pitch Day',
		category: 'Business',
		date: '2025-04-20',
		location: 'Singapore',
		price: 15,
		cover: 'https://picsum.photos/1200/400?3',
		description: 'Early-stage startups pitch ideas to investors and mentors.',
		organizerName: 'SEA Startup Hub',
	},
	{
		id: '4',
		title: 'Vue.js Workshop',
		category: 'Tech',
		date: '2025-04-22',
		location: 'Online',
		price: 0,
		cover: 'https://picsum.photos/1200/400?4',
		description: 'Hands-on Vue 3 workshop for beginners and intermediates.',
		organizerName: 'Frontend Masters SEA',
	},
	{
		id: '5',
		title: 'Yoga & Mindfulness Retreat',
		category: 'Health',
		date: '2025-04-25',
		location: 'Chiang Mai',
		price: 120,
		cover: 'https://picsum.photos/1200/400?5',
		description: 'A full-day retreat focused on relaxation and mental clarity.',
		organizerName: 'Zen Life Thailand',
	},
	{
		id: '6',
		title: 'Photography Walk: Old Town',
		category: 'Art',
		date: '2025-04-26',
		location: 'Bangkok',
		price: 10,
		cover: 'https://picsum.photos/1200/400?6',
		description: 'Explore Bangkok’s old town through street photography.',
		organizerName: 'BKK Photo Collective',
	},
	{
		id: '7',
		title: 'AI & Cybersecurity Conference',
		category: 'Tech',
		date: '2025-05-02',
		location: 'Singapore',
		price: 80,
		cover: 'https://picsum.photos/1200/400?7',
		description: 'Industry experts discuss AI-driven security challenges.',
		organizerName: 'Asia Cyber Forum',
	},
	{
		id: '8',
		title: 'Indie Film Screening Night',
		category: 'Film',
		date: '2025-05-05',
		location: 'Bangkok',
		price: 12,
		cover: 'https://picsum.photos/1200/400?8',
		description: 'A curated selection of short indie films from SEA.',
		organizerName: 'Indie Lens',
	},
	{
		id: '9',
		title: 'Marathon Prep Bootcamp',
		category: 'Sports',
		date: '2025-05-08',
		location: 'Online',
		price: 0,
		cover: 'https://picsum.photos/1200/400?9',
		description: 'Free online training sessions for first-time marathon runners.',
		organizerName: 'RunTogether',
	},
	{
		id: '10',
		title: 'Thai Street Food Festival',
		category: 'Food',
		date: '2025-05-10',
		location: 'Bangkok',
		price: 5,
		cover: 'https://picsum.photos/1200/400?10',
		description: 'Taste the best street food from vendors across Thailand.',
		organizerName: 'Taste of Thailand',
	},
]
