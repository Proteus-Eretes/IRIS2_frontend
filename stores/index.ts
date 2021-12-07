import { defineStore } from 'pinia';
import { RouteItem } from '~~/types/route-item.model';

interface RootState {
	mainNavigation: RouteItem[];
	competitionNavigation: RouteItem[];
	adminNavigation: RouteItem[];
}

const state = (): RootState => ({
	mainNavigation: [
		{ name: 'Dashboard', to: '/', icon: 'TemplateIcon', items: [] },
		{
			name: 'Blocks',
			to: '/blocks',
			icon: 'ViewGridIcon',
			items: [
				{
					name: 'Assign Events & Rounds',
					to: '/blocks/assign',
					icon: '',
					items: [],
				},
			],
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
	],
	competitionNavigation: [
		{ name: 'Export', to: '/export', icon: 'ShareIcon', items: [] },
		{
			name: 'Live recording',
			to: '/live-recording',
			icon: 'MicrophoneIcon',
			items: [],
		},
	],
	adminNavigation: [
		{
			name: 'Regattas',
			to: '/regattas',
			icon: 'CollectionIcon',
			items: [],
		},
	],
});

const getters = {};

const actions = {};

export const useMain = defineStore('main', {
	state,
	getters,
	actions,
});
