<template>
    <nav class="bg-white drop-shadow-sm">
        <div class="px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-24 items-center justify-between">
                <div class="flex-1">
                    <h1
                        class="text-2xl font-semibold leading-7 text-primary-900 sm:truncate sm:text-3xl"
                    >
                        <!-- FIXME: Node hydration -->
                        {{
                            regattas.selectedRegatta
                                ? regattas.selectedRegatta.name
                                : 'Regattas'
                        }}
                    </h1>
                    <div
                        v-if="regattas.selectedRegatta"
                        class="mt-0 flex flex-row flex-wrap gap-3 sm:gap-6"
                    >
                        <div class="mt-1 flex items-center text-sm">
                            <ph-calendar-blank
                                weight="bold"
                                class="icon mr-1.5 shrink-0 text-primary-400"
                                aria-hidden="true"
                            />
                            <UseTimeAgo
                                v-slot="{ timeAgo }"
                                :time="regattas.selectedRegatta.start_date"
                            >
                                <span
                                    class="text-primary-500"
                                    :title="
                                        formatDate(
                                            regattas.selectedRegatta.start_date,
                                            true
                                        )
                                    "
                                >
                                    {{ timeAgo }}
                                </span>
                            </UseTimeAgo>
                        </div>
                        <div class="mt-1 flex items-center text-sm">
                            <ph-arrows-counter-clockwise
                                v-if="
                                    regattas.selectedRegatta.race_type ==
                                    RegattaType.CHASE
                                "
                                weight="bold"
                                class="icon mr-1.5 shrink-0 text-primary-400"
                                aria-hidden="true"
                            />
                            <ph-clock-counter-clockwise
                                v-if="
                                    regattas.selectedRegatta.race_type ==
                                    RegattaType.ALL_ROUND
                                "
                                weight="bold"
                                class="icon mr-1.5 shrink-0 text-primary-400"
                                aria-hidden="true"
                            />
                            <span class="text-primary-500">
                                {{
                                    getRegattaTypeLabel(
                                        regattas.selectedRegatta.race_type
                                    )
                                }}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                    <button
                        type="button"
                        class="relative rounded-full bg-white p-1 text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        <span class="sr-only">View notifications</span>
                        <ph-bell
                            weight="bold"
                            class="icon"
                            aria-hidden="true"
                        />
                        <div
                            v-if="
                                regattas.selectedRegatta &&
                                regattas.selectedRegatta.breaking_news
                            "
                            class="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-secondary-500"
                        />
                    </button>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton
                                class="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-white"
                            >
                                <span class="sr-only">Open user menu</span>
                                <div
                                    class="flex h-8 w-8 justify-center overflow-hidden rounded-full bg-gray-100 text-center"
                                >
                                    <!-- UserIcon -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        class="h-8 w-8 translate-y-1 text-primary-400"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </MenuButton>
                        </div>
                        <Transition
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="opacity-0 scale-95"
                            enter-to-class="opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="opacity-100 scale-100"
                            leave-to-class="opacity-0 scale-95"
                        >
                            <MenuItems
                                class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <MenuItem v-slot="{ active }">
                                    <a
                                        @click="main.signOut()"
                                        :class="[
                                            active ? 'bg-gray-100' : '',
                                            'icon-button text-danger-700'
                                        ]"
                                    >
                                        <ph-sign-out
                                            class="icon text-danger-400"
                                        />
                                        <span>Sign out</span>
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { UseTimeAgo } from '@vueuse/components';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
    PhCalendarBlank,
    PhArrowsCounterClockwise,
    PhClockCounterClockwise,
    PhBell,
    PhSignOut
} from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useMainStore } from '~~/stores';

import { RegattaType, getRegattaTypeLabel } from '~~/models/regatta';

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatDate } = useDateFormatter();

const main = useMainStore();
const regattas = useRegattaStore();
</script>
