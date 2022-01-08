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
	tableActions: [
		{
			link: '/blocks/assign',
			id: 'assign',
			icon: 'PencilIcon',
			setting: 'Assign events and Rounds',
		},
		{
			link: '/blocks/draw-lots',
			id: 'lots',
			icon: 'CurrencyEuroIcon',
			setting: 'Draw lots',
		},
		{
			link: '/shirt-number/assign-shirts-overview',
			id: 'shirts',
			icon: 'ClipboardListIcon',
			setting: 'Assign shirt numbers',
		},
		{
			link: '',
			id: 'delete',
			icon: 'TrashIcon',
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
