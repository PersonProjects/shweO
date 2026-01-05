<template>
	<div class="flex align-center gap-2">
		<TopbarGuestActions v-if="!isAuthenticated" />
		<TopbarUserMenu v-else :context="context"/>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import TopbarGuestActions from "./TopbarGuestActions.vue";
import TopbarUserMenu from './TopbarUserMenu.vue'
import type { TopbarContext } from '@/types/topbar';

defineProps<{
	context: TopbarContext
}>()

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>