<template>
    <nav class="bg-white drop-shadow-sm">
        <div class="px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-24">
                <div class="flex-1">
                    <h1
                        class="text-2xl font-semibold leading-7 text-primary-900 sm:text-3xl sm:truncate"
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
                        class="flex flex-row flex-wrap mt-0 gap-3 sm:gap-6"
                    >
                        <div class="mt-1 flex items-center text-sm">
                            <ph-calendar-blank
                                weight="fill"
                                class="icon text-primary-400 shrink-0 mr-1.5"
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
                            <ph-bookmark-simple
                                weight="fill"
                                class="icon text-primary-400 shrink-0 mr-1.5"
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
                        class="relative bg-white p-1 rounded-full text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-secondary-500"
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
                            class="w-2.5 h-2.5 absolute top-1 right-1 rounded-full bg-secondary-500"
                        />
                    </button>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="ml-3 relative">
                        <div>
                            <MenuButton
                                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-secondary-500"
                            >
                                <span class="sr-only">Open user menu</span>
                                <div
                                    class="flex justify-center h-8 w-8 rounded-full bg-gray-100 overflow-hidden text-center"
                                >
                                    <!-- UserIcon -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        class="w-8 h-8 text-primary-400 translate-y-1"
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
                                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <MenuItem v-slot="{ active }">
                                    <a
                                        href="#"
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
import { useTimeAgo } from '@vueuse/core';
import { UseTimeAgo } from '@vueuse/components';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
    PhCalendarBlank,
    PhBookmarkSimple,
    PhBell,
    PhSignOut
} from 'phosphor-vue';

import { getRegattaTypeLabel } from '~~/types/regatta.model';

import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatDate } = useDateFormatter();

// const timeAgo = useTimeAgo(new Date(2021, 0, 1));
</script>
