<template>
	<v-card>
		<v-skeleton-loader
			type="image"
			height="160"
		/>

		<v-card-title>
			<v-skeleton-loader type="text" width="70%" />
		</v-card-title>

		<v-card-subtitle>
			<v-skeleton-loader type="text" width="50%" />
		</v-card-subtitle>

		<v-card-text>
			<v-skeleton-loader type="chip" width="80px" />
		</v-card-text>

		<v-card-actions>
			<v-skeleton-loader type="button" width="120px" />
		</v-card-actions>
	</v-card>
</template>
