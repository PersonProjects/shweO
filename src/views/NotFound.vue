<template>
	<div class="min-h-screen flex flex-col items-center justify-center text-center">
		<h1 class="text-6xl font-bold mb-4">404</h1>
		<p class="text-lg mb-6 text-gray-500">
			The page you're looking for doesn't exist.
		</p>
		<RouterLink to="/" class="text-primary font-medium">
			Go back home
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>