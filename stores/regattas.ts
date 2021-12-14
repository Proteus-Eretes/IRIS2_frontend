// add

// delete

// documentation

// edit

// index

// lotterySettings

// view

import { defineStore } from 'pinia';

import { Regatta } from '~~/types/regatta.model';
import regattaService from '~~/services/regatta.service';

interface RegattaState {
	ids: string[];
	entities: { [id: string]: Regatta };
	selectedId: string | null;
}

export const useRegattas = defineStore('regattas', {
	state: (): RegattaState => ({
		ids: [],
		entities: {},
		selectedId: null,
	}),

	getters: {
		allRegattas(state: RegattaState) {
			return state.ids.map((id: string) => state.entities[id]);
		},
		selectedRegatta(state: RegattaState) {
			return (
				(state.selectedId && state.entities[state.selectedId]) || null
			);
		},
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
		add(regatta: Regatta) {},
		delete(regatta: Regatta) {},
		edit(regatta: Regatta) {},
		lotterySettings() {},
	},
});
