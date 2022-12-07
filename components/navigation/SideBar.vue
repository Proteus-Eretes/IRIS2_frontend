<template>
    <nav
        :class="[
            isSideBarCollapsed ? 'w-side-bar-collapse' : 'w-side-bar',
            'flex h-full flex-col'
        ]"
    >
        <div class="flex items-end justify-end bg-secondary-500">
            <NuxtLink
                :to="{ path: '/', query: { regatta: regattas.selectedId } }"
            >
                <NavigationIrisLogo
                    v-if="!isSideBarCollapsed"
                    class="h-24 w-64 text-white"
                />
                <div v-else class="h-24 w-16" />
            </NuxtLink>
        </div>

        <div class="grow bg-primary-700">
            <section v-if="regattas.selectedRegatta != null">
                <ul class="space-y-1 px-2 pt-3 pb-3">
                    <li v-for="item in main.mainNavigation" :key="item.name">
                        <NavigationSideBarItem
                            :item="item"
                            :show-text="!isSideBarCollapsed"
                        />
                    </li>
                </ul>
            </section>

            <section v-if="regattas.selectedRegatta != null">
                <p
                    v-if="!isSideBarCollapsed"
                    class="px-5 pt-3 text-sm font-medium uppercase text-primary-500"
                >
                    During the competition
                </p>
                <ul class="space-y-1 px-2 pt-2 pb-3">
                    <li
                        v-for="item in main.competitionNavigation"
                        :key="item.name"
                    >
                        <NavigationSideBarItem
                            :item="item"
                            :show-text="!isSideBarCollapsed"
                        />
                    </li>
                </ul>
            </section>

            <section>
                <p
                    v-if="!isSideBarCollapsed"
                    class="px-5 pt-3 text-sm font-medium uppercase text-primary-500"
                >
                    IRIS admin
                </p>
                <ul class="space-y-1 px-2 pt-2 pb-3">
                    <li v-for="item in main.adminNavigation" :key="item.name">
                        <NavigationSideBarItem
                            :item="item"
                            :show-text="!isSideBarCollapsed"
                        />
                    </li>
                </ul>
            </section>

            <section>
                <ul class="space-y-1 px-2 pt-2">
                    <li>
                        <button
                            @click="toggleSideBar()"
                            :class="[
                                'group flex w-full space-x-3 rounded-md px-3 py-2 text-base font-medium text-primary-500 hover:bg-primary-600 hover:text-white'
                            ]"
                        >
                            <Icon
                                :class="[
                                    'h-6 w-6 text-primary-500 transition-transform group-hover:text-white',
                                    isSideBarCollapsed
                                        ? '-rotate-90'
                                        : 'rotate-90'
                                ]"
                                name="ph:caret-double-down"
                                aria-hidden="true"
                            />
                            <span v-show="!isSideBarCollapsed">Collapse</span>
                        </button>
                    </li>
                </ul>
            </section>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { useMainStore } from "~/stores";
import { useRegattaStore } from '~~/stores/regatta';
import { useToggle } from "@vueuse/core";

const main = useMainStore();
const regattas = useRegattaStore();

const isSideBarCollapsed = useState<boolean>('sideBar', () => false);
const toggleSideBar = useToggle(isSideBarCollapsed);

onMounted(() => {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const smallerLg = breakpoints.isSmaller('lg');

    if (smallerLg) isSideBarCollapsed.value = true;
});
</script>
