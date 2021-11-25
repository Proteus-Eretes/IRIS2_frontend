<template>
	<nav class="w-64 h-full flex flex-col">
		<div class="flex justify-end bg-secondary-500">
			<IrisLogo class="text-white w-32 h-32" />
		</div>

		<div class="flex-grow bg-primary-700">
			<ul class="px-2 pt-2 pb-3 space-y-1">
				<li v-for="item in mainNavigation" :key="item.name">
					<SidebarItem :item="item" />
				</li>
			</ul>

			<p class="pt-3 px-5 text-primary-300 text-sm font-medium uppercase">During the competition</p>
			<ul class="px-2 pt-2 pb-3 space-y-1">
				<li v-for="item in competitionNavigation" :key="item.name">
					<SidebarItem :item="item" />
				</li>
			</ul>
		</div>
	</nav>
</template>

<script lang="ts" setup>
const mainNavigation = [
	{
		name: 'Dashboard',
		to: '/',
		icon: 'TemplateIcon',
		items: [{ name: 'Assign Events & Rounds', to: '/mika' }],
	},
	{ name: 'Blocks', to: '/blocks', icon: 'ViewGridIcon', items: [] },
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
</script>
