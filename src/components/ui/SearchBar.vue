<template>
	<v-text-field v-if="!isMobile"
		v-model="query"
		:placeholder="$t('search.placeholder')"
		prepend-inner-icon="mdi-magnify"
		variant="solo"
		density="compact"
		hide-details
		rounded="xl"
		class="search-box"
		@keyup.enter="search"
	/>
	<v-btn v-else
		icon="mdi-magnify"
		variant="outlined"
		density="comfortable"
		@click="goSearch"
	>
	</v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui.store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const query = ref('')
const { isMobile } = storeToRefs(useUiStore())

const search = () => {
	if (!query.value.trim()) return
	router.push({
		name: 'results',
		query: {q: query.value}
	})
}

const goSearch = () => {
	router.push({name: 'results'})
}
</script>

<style scoped>
.search-bar {
	max-width: 420px;
}
</style>