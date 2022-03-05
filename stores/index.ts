import { defineStore } from 'pinia';
import { RouteItem } from '~~/models/route-item';
import { TableAction } from '~~/models/table';
import { Toast } from '~~/models/toast';

interface RootState {
    mainNavigation: RouteItem[];
    competitionNavigation: RouteItem[];
    adminNavigation: RouteItem[];
    tableActions: TableAction[];
}

export const useMainStore = defineStore('main', {
    state: (): RootState => ({
        mainNavigation: [
            { name: 'Dashboard', to: '/', icon: 'ph-gauge' },
            {
                name: 'Blocks',
                to: '/blocks',
                icon: 'ph-squares-four',
                items: [
                    {
                        name: 'Assign Events & Rounds',
                        to: '/blocks/assign',
                        icon: ''
                    }
                ]
            },
            {
                name: 'Draw lots',
                to: '/draw',
                icon: 'ph-coin-vertical',
                items: [
                    {
                        name: 'Starting order',
                        to: '/draw/starting-order',
                        icon: ''
                    }
                ]
            },
            {
                name: 'Shirt numbers',
                to: '/shirt-numbers',
                icon: 'ph-list-numbers'
            },
            { name: 'Crews', to: '/crews', icon: 'ph-users-three', items: [] },
            {
                name: 'Events',
                to: '/events',
                icon: 'ph-calendar-blank'
            }
        ],
        competitionNavigation: [
            { name: 'Export', to: '/export', icon: 'ph-export', items: [] },
            {
                name: 'Live recording',
                to: '/live-recording',
                icon: 'ph-microphone'
            }
        ],
        adminNavigation: [
            {
                name: 'Regattas',
                to: '/regattas',
                icon: 'ph-clipboard-text'
            }
        ],
        tableActions: [
            {
                id: 'assign',
                icon: 'ph-calendar-plus',
                setting: 'Assign events and Rounds'
            },
            {
                id: 'draw',
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
        ]
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
