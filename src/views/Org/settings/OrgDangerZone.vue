<template>
	<v-card color="red-lighten-5">
		<v-card-title class="text-red">
			Danger Zone
		</v-card-title>

		<v-card-text>
			<v-btn
				color="red"
				variant="outlined"
			>
				Leave Organization
			</v-btn>

			<v-btn
				color="red"
				variant="outlined"
				disabled
				class="ml-2"
			>
				Archive Organization
			</v-btn>
		</v-card-text>
	</v-card>
</template>
