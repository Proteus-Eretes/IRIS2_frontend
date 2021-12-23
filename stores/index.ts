import { defineStore } from 'pinia';
import { RouteItem } from '~~/types/route-item.model';
import { Toast } from '~~/types/toast';

interface RootState {
	mainNavigation: RouteItem[];
	competitionNavigation: RouteItem[];
	adminNavigation: RouteItem[];
	showToast: boolean;
	toast: Toast;
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
	showToast: false,
	toast: {
		message: '',
	},
});

const getters = {};

const actions = {};

export const useMainStore = defineStore('main', {
	state,
	getters,
	actions,
});
