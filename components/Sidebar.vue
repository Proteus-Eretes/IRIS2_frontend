<template>
	<nav class="w-64 h-full flex flex-col">
		<div class="flex items-end justify-end bg-secondary-500">
			<NuxtLink to="/">
				<IrisLogo class="text-white w-64 h-24" />
			</NuxtLink>
		</div>

		<div class="flex-grow bg-primary-700">
			<section v-if="regattas.getSelectedRegetta != null">
				<ul class="px-2 pt-3 pb-3 space-y-1">
					<li v-for="item in mainNavigation" :key="item.name">
						<SidebarItem :item="item" />
					</li>
				</ul>
			</section>

			<section v-if="regattas.getSelectedRegetta != null">
				<p
					class="
						pt-3
						px-5
						text-primary-300 text-sm
						font-medium
						uppercase
					"
				>
					During the competition
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li v-for="item in competitionNavigation" :key="item.name">
						<SidebarItem :item="item" />
					</li>
				</ul>
			</section>

			<section>
				<p
					class="
						pt-3
						px-5
						text-primary-300 text-sm
						font-medium
						uppercase
					"
				>
					IRIS admin
				</p>
				<ul class="px-2 pt-2 pb-3 space-y-1">
					<li v-for="item in adminNavigation" :key="item.name">
						<SidebarItem :item="item" />
					</li>
				</ul>
			</section>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useRegattas } from '~~/stores/regattas';

const regattas = useRegattas();

const mainNavigation = [
	{ name: 'Dashboard', to: '/', icon: 'TemplateIcon', items: [] },
	{
		name: 'Blocks',
		to: '/blocks',
		icon: 'ViewGridIcon',
		items: [{ name: 'Assign Events & Rounds', to: '/blocks/assign' }],
	},
	{ name: 'Crews', to: '/crews', icon: 'UserGroupIcon', items: [] },
	{ name: 'Events', to: '/events', icon: 'CalendarIcon', items: [] },
	{ name: 'Toss', to: '/toss', icon: 'CurrencyEuroIcon', items: [] },
	{
		name: 'Shirt numbers',
		to: '/shirt-numbers',
		icon: 'ClipboardListIcon',
		items: [],
	},
];

const competitionNavigation = [
	{ name: 'Export', to: '/export', icon: 'ShareIcon', items: [] },
	{
		name: 'Live recording',
		to: '/live-recording',
		icon: 'MicrophoneIcon',
		items: [],
	},
];

const adminNavigation = [
	{ name: 'Regattas', to: '/regattas', icon: 'CollectionIcon', items: [] },
];
</script>
