<template>
	<v-carousel
		hide-delimiters
		height="360"
		cycle
		show-arrows="hover"
	>
		<v-carousel-item
			v-for="slide in slides"
			:key="slide.title"
			cover
		>
			<v-sheet
				class="fill-height d-flex align-center"
				:color="slide.color"
			>
				<v-container>
					<h1 class="text-h3 font-weight-bold">
						{{ slide.title }}
					</h1>
					<p class="text-subtitle-1 mt-2">
						{{ slide.subtitle }}
					</p>
					<v-btn class="mt-4" color="primary">
						{{ slide.cta }}
					</v-btn>
				</v-container>
			</v-sheet>
		</v-carousel-item>
	</v-carousel>
</template>

<script setup lang="ts">
const slides = [
	{
		title: 'Discover events near you',
		subtitle: 'Concerts, tech meetups, workshops',
		cta: 'Browse Events',
		color: 'primary',
	},
	{
		title: 'Host your own event',
		subtitle: 'Create, manage, sell tickets',
		cta: 'Create Event',
		color: 'secondary',
	},
]
</script>
