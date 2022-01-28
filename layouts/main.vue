<template>
    <div class="flex min-h-screen w-screen flex-row overflow-x-hidden">
        <aside class="z-30">
            <NavigationSideBar />
        </aside>

        <div class="flex min-h-screen w-main-content grow flex-col">
            <aside class="z-30">
                <NavigationBar />
            </aside>

            <main class="grow overflow-x-scroll bg-gray-200">
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
</script>
