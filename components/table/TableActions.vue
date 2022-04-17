<template>
    <div v-if="actions" class="table-cell px-3 py-2 text-center">
        <Menu as="template">
            <MenuButton
                class="rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-white"
            >
                <span class="sr-only">Open action menu</span>

                <ph-dots-three class="icon inline-block text-gray-400" />
            </MenuButton>
            <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <MenuItems
                    class="absolute right-0 z-20 w-48 origin-top-right rounded-md bg-white py-1 text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <MenuItem
                        v-for="action in actions"
                        :key="action"
                        v-slot="{ active }"
                    >
                        <a
                            :class="[
                                active ? 'bg-gray-100' : '',
                                action == 'delete'
                                    ? 'text-danger-700'
                                    : 'text-gray-700',
                                'icon-button'
                            ]"
                            @click="
                                $emit('action', {
                                    action,
                                    item
                                })
                            "
                        >
                            <component
                                :is="main.getTableActionById(action).icon"
                                :class="[
                                    action == 'delete'
                                        ? 'text-danger-400'
                                        : 'text-gray-400',
                                    'icon'
                                ]"
                            />
                            <span>
                                {{ main.getTableActionById(action).setting }}
                            </span>
                        </a>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
    PhCalendarPlus,
    PhCoinVertical,
    PhListNumbers,
    PhTrash,
    PhPencil,
    PhDotsThree
} from 'phosphor-vue';

import { useMainStore } from '~~/stores';
const main = useMainStore();

interface Props {
    actions?: string[]; // These are all the actions for an item. The attributes and ids are in `stores/index.ts`
    item: any; // Current item to feed back into the action call
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'action', action: { action: string; item: any }): void;
}>();
</script>
