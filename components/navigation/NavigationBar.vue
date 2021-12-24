<template>
	<nav class="bg-white drop-shadow-sm">
		<div class="px-2 sm:px-6 lg:px-8">
			<div class="relative flex items-center justify-between h-24">
				<div class="flex-1">
					<h1
						class="
							text-lg
							font-semibold
							leading-7
							text-primary-900
							sm:text-3xl sm:truncate
						"
					>
						<!-- FIXME: Node hydration -->
						{{
							regattas.selectedRegatta
								? regattas.selectedRegatta.name
								: 'Regattas'
						}}
					</h1>
					<div
						class="
							flex flex-col
							sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6
						"
					>
						<div class="mt-1 flex items-center text-sm">
							<CalendarIcon
								class="icon text-gray-400 shrink-0 mr-1.5"
								aria-hidden="true"
							/>
							<span class="text-gray-500">
								{{
									regattas.selectedRegatta
										? formatDate(
												regattas.selectedRegatta
													.start_date,
												true
										  )
										: ''
								}}
							</span>
						</div>
						<div class="mt-1 flex items-center text-sm">
							<LocationMarkerIcon
								class="icon text-gray-400 shrink-0 mr-1.5"
								aria-hidden="true"
							/>
							<span class="text-gray-500">
								{{
									regattas.selectedRegatta
										? regattas.selectedRegatta.venue_id
										: ''
								}}
							</span>
						</div>
						<div class="mt-1 flex items-center text-sm">
							<BookmarkIcon
								class="icon text-gray-400 shrink-0 mr-1.5"
								aria-hidden="true"
							/>
							<span class="text-gray-500">
								{{
									regattas.selectedRegatta
										? getRegattaTypeLabel(
												regattas.selectedRegatta
													.race_type
										  )
										: ''
								}}
							</span>
						</div>
					</div>
				</div>

				<div
					class="
						absolute
						inset-y-0
						right-0
						flex
						items-center
						pr-2
						sm:static sm:inset-auto sm:ml-6 sm:pr-0
					"
				>
					<button
						type="button"
						class="
							relative
							bg-white
							p-1
							rounded-full
							text-gray-600
							hover:text-gray-500
							focus:outline-none
							focus:ring-2
							focus:ring-offset-2
							focus:ring-offset-white
							focus:ring-secondary-500
						"
					>
						<span class="sr-only">View notifications</span>
						<BellIcon class="h-6 w-6" aria-hidden="true" />
						<div
							v-if="
								regattas.selectedRegatta &&
								regattas.selectedRegatta.breaking_news
							"
							class="
								w-2.5
								h-2.5
								absolute
								top-1
								right-1
								rounded-full
								bg-secondary-500
							"
						/>
					</button>

					<!-- Profile dropdown -->
					<Menu as="div" class="ml-3 relative">
						<div>
							<MenuButton
								class="
									flex
									text-sm
									rounded-full
									focus:outline-none
									focus:ring-2
									focus:ring-offset-2
									focus:ring-offset-white
									focus:ring-secondary-500
								"
							>
								<span class="sr-only">Open user menu</span>
								<div
									class="
										h-8
										w-8
										rounded-full
										bg-gray-100
										overflow-hidden
									"
								>
									<UserIcon
										class="text-gray-400 translate-y-1"
									/>
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
								class="
									origin-top-right
									absolute
									right-0
									mt-2
									w-48
									rounded-md
									shadow-lg
									py-1
									bg-white
									ring-1 ring-black ring-opacity-5
									focus:outline-none
								"
							>
								<MenuItem v-slot="{ active }">
									<a
										href="#"
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700',
										]"
									>
										Sign out
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';
import {
	UserIcon,
	CalendarIcon,
	LocationMarkerIcon,
	BookmarkIcon,
} from '@heroicons/vue/solid';

import { getRegattaTypeLabel } from '~~/types/regatta.model';

import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatDate, formatTime } = useDateFormatter();
</script>
