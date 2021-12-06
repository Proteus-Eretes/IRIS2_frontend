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
					<!-- FIXME Node hydration -->
						{{
							regattas.getSelectedRegetta
								? regattas.getSelectedRegetta.name
								: 'Regattas'
						}}
					</h1>
					<div
						class="
							flex flex-col
							sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6
						"
					>
						<div
							class="mt-1 flex items-center text-sm text-gray-500"
						>
							<CalendarIcon
								class="
									icon-gray
									flex-shrink-0
									mr-1.5
								"
								aria-hidden="true"
							/>
							<span>
								{{
									regattas.getSelectedRegetta
										? formatDate(
												regattas.getSelectedRegetta
													.start_date
										  )
										: ''
								}}
							</span>
						</div>
						<div
							class="mt-1 flex items-center text-sm text-gray-500"
						>
							<LocationMarkerIcon
								class="
									icon-gray
									flex-shrink-0
									mr-1.5
								"
								aria-hidden="true"
							/>
							<span>
								{{
									regattas.getSelectedRegetta
										? regattas.getSelectedRegetta.venue_id
										: ''
								}}
							</span>
						</div>
						<div
							class="mt-1 flex items-center text-sm text-gray-500"
						>
							<BookmarkIcon
								class="
									icon-gray
									flex-shrink-0
									mr-1.5
								"
								aria-hidden="true"
							/>
							<span>
								{{
									regattas.getSelectedRegetta
										? regattas.getSelectedRegetta.race_type
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
						<transition
							enter-active-class="transition ease-out duration-100"
							enter-from-class="transform opacity-0 scale-95"
							enter-to-class="transform opacity-100 scale-100"
							leave-active-class="transition ease-in duration-75"
							leave-from-class="transform opacity-100 scale-100"
							leave-to-class="transform opacity-0 scale-95"
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
						</transition>
					</Menu>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useRegattas } from '~~/stores/regattas';

const regattas = useRegattas();
</script>

<script lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';
import {
	UserIcon,
	CalendarIcon,
	LocationMarkerIcon,
	BookmarkIcon,
} from '@heroicons/vue/solid';

import * as dayjs from 'dayjs';

export default defineComponent({
	components: {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		BellIcon,
		MenuIcon,
		XIcon,
		UserIcon,
		CalendarIcon,
		LocationMarkerIcon,
		BookmarkIcon,
	},
	methods: {
		formatDate(date: Date) {
			return dayjs(date).format('DD-MM-YYYY');
		},
	},
});
</script>
