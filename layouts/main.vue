<template>
	<div class="min-h-screen flex flex-row">
		<aside>
			<Sidebar />
		</aside>

		<div class="flex-grow min-h-screen flex flex-col">
			<NavigationBar />

			<main class="bg-gray-100 flex-grow">
				<slot />
			</main>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRegattas } from '@/stores/regattas';
const router = useRouter();

router.beforeEach((to, from, next) => {
	const regattas = useRegattas();
	if (regattas.selectedId == null && to.path != '/regattas') next('/regattas');
	else next();
});
</script>
