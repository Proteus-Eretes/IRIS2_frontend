import { defineStore } from 'pinia';
import { RouteItem } from '~~/models/route-item';
import { TableAction } from '~~/models/table';
import { Toast } from '~~/models/toast';

interface RootState {
    mainNavigation: RouteItem[];
    competitionNavigation: RouteItem[];
    adminNavigation: RouteItem[];
    tableActions: TableAction[];
    showToast: boolean;
    toast: Toast;
}

export const useMainStore = defineStore('main', {
    state: (): RootState => ({
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
                        items: []
                    }
                ]
            },
            {
                name: 'Draw lots',
                to: '/lots',
                icon: 'ph-coin-vertical',
                items: []
            },
            {
                name: 'Shirt numbers',
                to: '/shirt-numbers',
                icon: 'ph-list-numbers',
                items: []
            },
            { name: 'Crews', to: '/crews', icon: 'ph-users-three', items: [] },
            {
                name: 'Events',
                to: '/events',
                icon: 'ph-calendar-blank',
                items: []
            }
        ],
        competitionNavigation: [
            { name: 'Export', to: '/export', icon: 'ph-export', items: [] },
            {
                name: 'Live recording',
                to: '/live-recording',
                icon: 'ph-microphone',
                items: []
            }
        ],
        adminNavigation: [
            {
                name: 'Regattas',
                to: '/regattas',
                icon: 'ph-clipboard-text',
                items: []
            }
        ],
        tableActions: [
            {
                id: 'assign',
                icon: 'ph-calendar-plus',
                setting: 'Assign events and Rounds'
            },
            {
                id: 'lots',
                icon: 'ph-coin-vertical',
                setting: 'Draw lots'
            },
            {
                id: 'shirts',
                icon: 'ph-list-numbers',
                setting: 'Assign shirt numbers'
            },
            {
                id: 'delete',
                icon: 'ph-trash',
                setting: 'Delete'
            },
            {
                id: 'edit',
                icon: 'ph-pencil',
                setting: 'Edit'
            }
        ],
        showToast: false,
        toast: {
            message: ''
        }
    }),

    getters: {
        getTableActionById(state: RootState) {
            return (id: string) => {
                return state.tableActions.find(
                    (action: TableAction) => action.id == id
                );
            };
        }
    },

    actions: {
        // TODO: login flow
        signOut() {}
    }
});
