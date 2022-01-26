import { defineStore } from 'pinia';

import { Club, ClubDetail } from '~~/models/club';
import { useClubService } from '~~/composables/useClubService';
const clubService = useClubService();

import { useToastService } from '~~/composables/useToastService';
import { useRegattaStore } from './regatta';
const { showError } = useToastService();

interface ClubState {
    ids: string[];
    entities: { [id: string]: Club };
    detailIds: string[];
    detailEntities: { [id: string]: ClubDetail };
    selectedId: string | null;
}

export const useClubStore = defineStore('clubs', {
    state: (): ClubState => ({
        ids: [],
        entities: {},
        detailIds: [],
        detailEntities: {},
        selectedId: null
    }),

    getters: {
        allClubs(state: ClubState) {
            return state.ids.map((id: string) => state.entities[id]);
        },
        selectedClub(state: ClubState) {
            return (
                (state.selectedId && state.entities[state.selectedId]) || null
            );
        },
        getClubById(state: ClubState) {
            return (id: string) => {
                return (id && state.entities[id]) || null;
            };
        },
        selectedClubDetail(state: ClubState) {
            return (
                (state.selectedId && state.detailEntities[state.selectedId]) ||
                null
            );
        }
    },

    actions: {
        async loadClubs() {
            const regattaId = useRegattaStore().selectedId;
            if (regattaId == null) {
                return;
            }

            const loadedClubs = await clubService.loadClubs(regattaId);

            const clubIds = loadedClubs.map((club) => club.id);
            const clubEntities = loadedClubs.reduce(
                (entities: { [id: string]: Club }, club: Club) => {
                    return { ...entities, [club.id]: club };
                },
                {}
            );

            this.ids = clubIds;
            this.entities = clubEntities;
        },
        async loadSelectedClub() {
            const clubId = this.selectedId;
            if (clubId == null) {
                return;
            }

            const club = await clubService.loadClubDetail(clubId);

            this.detailIds = [...this.detailIds, club.id];
            this.detailEntities = {
                ...this.detailEntities,
                [club.id]: club
            };
        },
        add(club: Club) {},
        delete(club: Club) {},
        edit(club: Club) {},
        lotterySettings() {}
    }
});
