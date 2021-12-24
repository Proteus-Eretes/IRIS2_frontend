<template>
	<div class="min-h-screen flex flex-row">
		<aside class="z-30">
			<NavigationSideBar />
		</aside>

		<div class="grow min-h-screen flex flex-col">
			<aside class="z-30">
				<NavigationBar />
			</aside>

			<main class="bg-gray-200 grow">
				<slot />
			</main>

			<Toast v-model:open="main.showToast" :toast="main.toast" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';
import { useMainStore } from '~~/stores';

const regattas = useRegattaStore();
regattas.loadRegattas();

const main = useMainStore()

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
