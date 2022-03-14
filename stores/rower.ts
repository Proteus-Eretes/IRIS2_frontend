import { defineStore } from 'pinia';
import { useRegattaStore } from './regatta';

import { NewRower, Rower, RowerDetail, RowerRole } from '~~/models/rower';
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
            return state.ids
                .map((id: string) => state.entities[id])
                .sort((a: Rower, b: Rower) => a.position - b.position);
        },
        allRowersByCrew(state: RowerState) {
            const allRowers = state.ids
                .map((id: string) => state.entities[id])
                .sort((a: Rower, b: Rower) => a.position - b.position);
            const selectedId = useCrewStore().selectedCrewId;

            return (id: string = selectedId) => {
                return allRowers.filter(
                    (rower: Rower) =>
                        rower.crew_id == id && rower.role == RowerRole.ROWER
                );
            };
        },
        allCoachesByCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);
            const selectedId = useCrewStore().selectedCrewId;

            return (id: string = selectedId) => {
                return allRowers.filter(
                    (rower: Rower) =>
                        rower.crew_id == id && rower.role == RowerRole.COACH
                );
            };
        },
        allCoxesByCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);
            const selectedId = useCrewStore().selectedCrewId;

            return (id: string = selectedId) => {
                return allRowers.filter(
                    (rower: Rower) =>
                        rower.crew_id == id && rower.role == RowerRole.COX
                );
            };
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
        strokeByCrew(state: RowerState) {
            const allRowers = state.ids.map((id: string) => state.entities[id]);
            const selectedId = useCrewStore().selectedCrewId;

            return (id: string = selectedId) => {
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

            try {
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
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the rowers'
                );
            }
        },
        async loadRowersByCrew() {
            const crewId = useCrewStore().selectedCrewId;
            if (crewId == null) {
                return;
            }

            try {
                const loadedRowers = await rowerService.loadRowersByCrew(
                    crewId
                );

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
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the rowers'
                );
            }
        },
        async loadSelectedRower() {
            const rowerId = this.selectedId;
            if (rowerId == null) {
                return;
            }

            try {
                const rower = await rowerService.loadRowerDetail(rowerId);

                this.detailIds = [...this.detailIds, rower.id];
                this.detailEntities = {
                    ...this.detailEntities,
                    [rower.id]: rower
                };
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the selected rower'
                );
            }
        },
        async add(newRower: NewRower) {
            try {
                const rower = await rowerService.addRower(newRower);

                this.ids = [...this.ids, rower.id];
                this.entities = {
                    ...this.entities,
                    [rower.id]: rower
                };
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong adding the rower'
                );
            }
        },
        delete(id: string) {
            this.ids.splice(this.ids.indexOf(id), 1);
            delete this.entities[id];

            this.detailIds.splice(this.detailIds.indexOf(id), 1);
            delete this.detailEntities[id];
        },
        async edit(id: string, data: NewRower) {
            try {
                const editedRower = await rowerService.editRower(id, data);

                this.entities[id] = editedRower;
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong editing the rower'
                );
            }
        }
    }
});
