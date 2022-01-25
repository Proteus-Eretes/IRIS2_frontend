// documentation

// edit

// lotterySettings

import { defineStore } from 'pinia';

import { NewRegatta, Regatta, RegattaDetail } from '~~/types/regatta.model';
import { useRegattaService } from '~~/composables/useRegattaService';
const regattaService = useRegattaService();

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { isBeforeOrAfter } = useDateFormatter();

interface RegattaState {
    ids: string[];
    entities: { [id: string]: Regatta };
    detailIds: string[];
    detailEntities: { [id: string]: RegattaDetail };
    selectedId: string | null;
}

export const useRegattaStore = defineStore('regattas', {
    state: (): RegattaState => ({
        ids: [],
        entities: {},
        detailIds: [],
        detailEntities: {},
        selectedId: null
    }),

    getters: {
        allRegattas(state: RegattaState) {
            return state.ids
                .map((id: string) => state.entities[id])
                .sort((a: Regatta, b: Regatta) =>
                    isBeforeOrAfter(a.start_date, b.start_date)
                );
        },
        selectedRegatta(state: RegattaState) {
            return (
                (state.selectedId && state.entities[state.selectedId]) || null
            );
        },
        selectedRegattaDetail(state: RegattaState) {
            return (
                (state.selectedId && state.detailEntities[state.selectedId]) ||
                null
            );
        }
    },

    actions: {
        async loadRegattas() {
            const loadedRegattas = await regattaService.loadRegattas();

            const regattaIds = loadedRegattas.map((regatta) => regatta.id);
            const regattaEntities = loadedRegattas.reduce(
                (entities: { [id: string]: Regatta }, regatta: Regatta) => {
                    return { ...entities, [regatta.id]: regatta };
                },
                {}
            );

            this.ids = regattaIds;
            this.entities = regattaEntities;
        },
        async loadSelectedRegatta() {
            const regattaId = this.selectedId;
            if (regattaId == null) {
                return;
            }

            const regatta = await regattaService.loadRegattaDetail(regattaId);

            this.detailIds = [...this.detailIds, regatta.id];
            this.detailEntities = {
                ...this.detailEntities,
                [regatta.id]: regatta
            };
        },
        async add(newRegatta: NewRegatta) {
            const regatta = await regattaService.addRegatta(newRegatta);

            this.ids = [...this.ids, regatta.id];
            this.entities = {
                ...this.entities,
                [regatta.id]: regatta
            };
        },
        delete(id: string) {
            this.ids.splice(this.ids.indexOf(id), 1);
            delete this.entities[id];

            this.detailIds.splice(this.detailIds.indexOf(id), 1);
            delete this.detailEntities[id];
        },
        async edit(id: string, data: NewRegatta) {
            const editedRegatta = await regattaService.editRegatta(id, data);

            this.entities[id] = editedRegatta;
        },
        lotterySettings() {}
    }
});
