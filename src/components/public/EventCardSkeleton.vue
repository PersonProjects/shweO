<template>
	<v-card>
		<v-skeleton-loader
			type="image"
			height="160"
		/>

		<v-card-text>
			<v-skeleton-loader type="heading" />
			<v-skeleton-loader type="text" />
			<v-skeleton-loader type="text" />
		</v-card-text>

		<v-card-actions>
			<v-skeleton-loader type="button" />
		</v-card-actions>
	</v-card>
</template>