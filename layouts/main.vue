<template>
	<div class="min-h-screen flex flex-row">
		<aside>
			<side-bar />
		</aside>

		<div class="flex-grow min-h-screen flex flex-col">
			<navigation-bar />

			<main class="bg-gray-200 flex-grow">
				<slot />
			</main>
		</div>
	</div>
</template>

<script lang="ts" setup>
import SideBar from '~~/components/navigation/SideBar.vue';
import Navigationbar from '~~/components/navigation/NavigationBar.vue';

import { useRegattas } from '@/stores/regattas';
const router = useRouter();

router.beforeEach((to, from, next) => {
	const regattas = useRegattas();
	if (regattas.selectedId == null && to.path != '/regattas') next('/regattas');
	else next();
});
</script>
