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
const regattas = useRegattas();
regattas.loadRegattas();

const router = useRouter();
const { regatta } = router.currentRoute.value.query;
if (regatta && typeof regatta == 'string') {
	regattas.selectRegatta(regatta);
} else {
	router.push('/regattas');
}

router.beforeEach((to, from, next) => {
	const { regatta } = to.query;
	
	if ((regatta && typeof regatta == 'string') || to.path == '/regattas') next();
	else next('/regattas');
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	middleware: 'regatta',
});
</script>
