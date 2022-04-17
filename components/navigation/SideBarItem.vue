<template>
    <NuxtLink
        :to="{ path: item.to, query: { regatta: regattas.selectedId } }"
        v-slot="{ isExactActive }"
    >
        <div
            :class="[
                isParentActive(item.to) ? 'bg-primary-800 text-white' : '',
                'rounded-md'
            ]"
        >
            <div
                :class="[
                    isExactActive
                        ? 'bg-secondary-500 text-white hover:bg-secondary-400'
                        : 'text-primary-300 hover:bg-primary-600',
                    'group flex space-x-3 rounded-md px-3 py-2 text-base font-medium hover:text-white'
                ]"
            >
                <component
                    :is="getIcon(item.icon)"
                    class="h-6 w-6 text-primary-100 group-hover:text-white"
                    aria-hidden="true"
                />
                <span v-show="showText">{{ item.name }}</span>
            </div>

            <ul v-show="item.items && isParentActive(item.to) && showText">
                <li v-for="subItem in item.items" :key="subItem.name">
                    <NuxtLink
                        :to="{
                            path: subItem.to,
                            query: { regatta: regattas.selectedId }
                        }"
                        v-slot="{ isExactActive }"
                    >
                        <div
                            :class="[
                                isExactActive
                                    ? 'bg-secondary-500 text-white hover:bg-secondary-400'
                                    : 'text-primary-300 hover:bg-primary-600',
                                'ml-9 flex space-x-3 rounded-md px-3 py-2 text-base font-medium hover:text-white'
                            ]"
                        >
                            {{ subItem.name }}
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import {
    PhGauge,
    PhSquaresFour,
    PhUsersThree,
    PhCalendarBlank,
    PhCoinVertical,
    PhListNumbers,
    PhExport,
    PhMicrophone,
    PhClipboardText
} from 'phosphor-vue';
import { RouteItem } from '~~/models/route-item';

import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

const router = useRouter();

const isParentActive = (base: string): boolean => {
    if (base === '/') return router.currentRoute.value.fullPath == '/';
    return router.currentRoute.value.fullPath.includes(base);
};

// Get the icon component based on its string
const getIcon = (icon: string) => {
    switch (icon) {
        case 'ph-gauge':
            return PhGauge;
        case 'ph-squares-four':
            return PhSquaresFour;
        case 'ph-users-three':
            return PhUsersThree;
        case 'ph-calendar-blank':
            return PhCalendarBlank;
        case 'ph-coin-vertical':
            return PhCoinVertical;
        case 'ph-list-numbers':
            return PhListNumbers;
        case 'ph-export':
            return PhExport;
        case 'ph-microphone':
            return PhMicrophone;
        case 'ph-clipboard-text':
            return PhClipboardText;
    }
};

const props = defineProps<{
    item: RouteItem; // The item defined in stores/index.ts
    showText?: boolean; // Boolean to show the title of the item
}>();
</script>
