import { defineStore } from 'pinia';
import { RouteItem } from '~~/types/route-item.model';
import { TableAction } from '~~/types/table-action.model';
import { Toast } from '~~/types/toast.model';

interface RootState {
	mainNavigation: RouteItem[];
	competitionNavigation: RouteItem[];
	adminNavigation: RouteItem[];
	tableActions: TableAction[];
	showToast: boolean;
	toast: Toast;
}

const state = (): RootState => ({
	mainNavigation: [
		{ name: 'Dashboard', to: '/', icon: 'ph-gauge', items: [] },
		{
			name: 'Blocks',
			to: '/blocks',
			icon: 'ph-squares-four',
			items: [
				{
					name: 'Assign Events & Rounds',
					to: '/blocks/assign',
					icon: '',
					items: [],
				},
			],
		},
		{ name: 'Crews', to: '/crews', icon: 'ph-users-three', items: [] },
		{ name: 'Events', to: '/events', icon: 'ph-calendar-blank', items: [] },
		{ name: 'Toss', to: '/toss', icon: 'ph-coin-vertical', items: [] },
		{
			name: 'Shirt numbers',
			to: '/shirt-numbers',
			icon: 'ph-list-numbers',
			items: [],
		},
	],
	competitionNavigation: [
		{ name: 'Export', to: '/export', icon: 'ph-export', items: [] },
		{
			name: 'Live recording',
			to: '/live-recording',
			icon: 'ph-microphone',
			items: [],
		},
	],
	adminNavigation: [
		{
			name: 'Regattas',
			to: '/regattas',
			icon: 'ph-clipboard-text',
			items: [],
		},
	],
	tableActions: [
		{
			link: '/blocks/assign',
			id: 'assign',
			icon: 'ph-calendar-plus',
			setting: 'Assign events and Rounds',
		},
		{
			link: '/blocks/draw-lots',
			id: 'lots',
			icon: 'ph-coin-vertical',
			setting: 'Draw lots',
		},
		{
			link: '/shirt-number/assign-shirts-overview',
			id: 'shirts',
			icon: 'ph-list-numbers',
			setting: 'Assign shirt numbers',
		},
		{
			link: '',
			id: 'delete',
			icon: 'ph-trash',
			setting: 'Delete'
		}
	],
	showToast: false,
	toast: {
		message: '',
	},
});

const getters = {
	getTableActionById(state: RootState) {
		return (id: string) => {
			return state.tableActions.find(
				(action: TableAction) => action.id == id
			);
		};
	},
};

const actions = {};

export const useMainStore = defineStore('main', {
	state,
	getters,
	actions,
});
