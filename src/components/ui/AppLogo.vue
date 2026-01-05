<template>
	<v-toolbar-title 
		@click="goHome" 
		class="cursor-pointer"
	>
	<span>YouthHub</span>
	</v-toolbar-title>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const goHome = () => {
	router.push({name: 'home'})
}
</script>