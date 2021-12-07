<template>
	<div class="min-h-screen flex flex-row">
		<aside class="z-40">
			<side-bar />
		</aside>

		<div class="flex-grow min-h-screen flex flex-col">
			<aside class="z-40">
				<navigation-bar />
			</aside>

			<main class="bg-gray-200 flex-grow">
				<slot />
			</main>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUrlSearchParams } from '@vueuse/core';

import { useRegattas } from '@/stores/regattas';

import SideBar from '~~/components/navigation/SideBar.vue';
import Navigationbar from '~~/components/navigation/NavigationBar.vue';

const regattas = useRegattas();
regattas.loadRegattas();

const router = useRouter();

const { regatta } = useUrlSearchParams('history');
if (regatta && typeof regatta == 'string') {
	regattas.selectedId = regatta;
} else {
	router.push('/regattas');
}

// FIXME #2 Nuxt middleware
router.beforeEach((to, from, next) => {
	const { regatta } = to.query;

	if ((regatta && typeof regatta == 'string') || to.path == '/regattas')
		next();
	else next('/regattas');
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	middleware: 'regatta',
});
</script>
