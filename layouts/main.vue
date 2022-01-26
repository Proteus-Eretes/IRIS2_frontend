<template>
    <div class="flex min-h-screen w-screen flex-row">
        <aside class="z-30">
            <NavigationSideBar />
        </aside>

        <div class="flex min-h-screen w-main-content grow flex-col">
            <aside class="z-30">
                <NavigationBar />
            </aside>

            <main class="grow bg-gray-200">
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
const main = useMainStore();

await regattas.loadRegattas();

const router = useRouter();

const { regatta } = useUrlSearchParams('history');
if (regatta && typeof regatta == 'string') {
    regattas.selectedId = regatta;
} else {
    router.push('/regattas');
}

// FIXME: #2 Nuxt middleware
router.beforeEach((to, from, next) => {
    const { regatta } = to.query;

    if ((regatta && typeof regatta == 'string') || to.path == '/regattas')
        next();
    else next('/regattas');
});
</script>

<script lang="ts">
export default defineComponent({
    middleware: 'regatta'
});
</script>
