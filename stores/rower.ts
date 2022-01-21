// add

// delete

// edit

// getRowerInformation

import { defineStore } from 'pinia';
import { useRegattaStore } from './regatta';

import { NewRower, Rower, RowerDetail, RowerRole } from '~~/types/rower.model';
import { useRowerService } from '~~/composables/useRowerService';
const rowerService = useRowerService();

import { useToastService } from '~~/composables/useToastService';
import { useCrewStore } from './crew';
const { showError } = useToastService();

interface RowerState {
    ids: string[];
    entities: { [id: string]: Rower };
    detailIds: string[];
    detailEntities: { [id: string]: RowerDetail };
    selectedId: string | null;
}

export const useRowerStore = defineStore('rowers', {
    state: (): RowerState => ({
        ids: [],
        entities: {},
        detailIds: [],
        detailEntities: {},
        selectedId: null
    }),

    getters: {
        allRowers(state: RowerState) {
            return state.ids.map((id: string) => state.entities[id]);
        },
        allRowersOfSelectedCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);
            const selectedCrewId = useCrewStore().selectedCrewId;

            return allRowers.filter(
                (rower: Rower) =>
                    rower.crew_id == selectedCrewId &&
                    rower.role == RowerRole.ROWER
            );
        },
        allCoachesOfSelectedCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);
            const selectedCrewId = useCrewStore().selectedCrewId;

            return allRowers.filter(
                (rower: Rower) =>
                    rower.crew_id == selectedCrewId &&
                    rower.role == RowerRole.COACH
            );
        },
        allCoxesOfSelectedCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);
            const selectedCrewId = useCrewStore().selectedCrewId;

            return allRowers.filter(
                (rower: Rower) =>
                    rower.crew_id == selectedCrewId &&
                    rower.role == RowerRole.COX
            );
        },
        selectedRower(state: RowerState) {
            return (
                (state.selectedId && state.entities[state.selectedId]) || null
            );
        },
        selectedRowerDetail(state: RowerState) {
            return (
                (state.selectedId && state.detailEntities[state.selectedId]) ||
                null
            );
        },
        getStrokeByCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);

            return (id: string): Rower => {
                const allRowersByCrew = allRowers.filter(
                    (rower: Rower) => rower.crew_id == id
                );

                return allRowersByCrew.find(
                    (rower: Rower) => rower.position == 8
                );
            };
        }
    },

    actions: {
        async loadRowers() {
            const regattaId = useRegattaStore().selectedId;
            if (regattaId == null) {
                return;
            }

            const loadedRowers = await rowerService.loadRowers(regattaId);

            const rowerIds = loadedRowers.map((rower) => rower.id);
            const rowerEntities = loadedRowers.reduce(
                (entities: { [id: string]: Rower }, rower: Rower) => {
                    return { ...entities, [rower.id]: rower };
                },
                {}
            );

            this.ids = rowerIds;
            this.entities = rowerEntities;
        },
        async loadRowersByCrew() {
            const crewId = useCrewStore().selectedCrewId;
            if (crewId == null) {
                return;
            }

            const loadedRowers = await rowerService.loadRowersByCrew(crewId);

            const rowerIds = loadedRowers
                .map((rower) => rower.id)
                .filter((id: string) => this.ids.indexOf(id) == -1);
            const rowerEntities = loadedRowers.reduce(
                (entities: { [id: string]: Rower }, rower: Rower) => {
                    return { ...entities, [rower.id]: rower };
                },
                {}
            );

            this.ids = [...this.ids, ...rowerIds];
            this.entities = { ...this.entities, ...rowerEntities };
        },
        async loadSelectedRower() {
            const rowerId = this.selectedId;
            if (rowerId == null) {
                return;
            }

            const rower = await rowerService.loadRowerDetail(rowerId);

            this.detailIds = [...this.detailIds, rower.id];
            this.detailEntities = {
                ...this.detailEntities,
                [rower.id]: rower
            };
        },
        async add(newRower: NewRower) {
            const rower = await rowerService.addRower(newRower);

            this.ids = [...this.ids, rower.id];
            this.entities = {
                ...this.entities,
                [rower.id]: rower
            };
        },
        delete(rower: Rower) {},
        edit(rower: Rower) {},
        lotterySettings() {}
    }
});
