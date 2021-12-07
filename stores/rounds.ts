import { defineStore } from 'pinia';

import { Round, RoundDetail } from '~~/types/round.model';
import roundService from '~~/services/round.service';
import { Field } from '~~/types/event.model';

interface RoundState {
	ids: string[];
	entities: { [id: string]: RoundDetail };
	selectedId: string | null;
}

const state = (): RoundState => ({
	ids: [],
	entities: {},
	selectedId: null,
});

const getters = {
	allRounds(state: RoundState) {
		return state.ids.map((id: string) => state.entities[id]);
	},
	selectedRound(state: RoundState) {
		return (state.selectedId && state.entities[state.selectedId]) || null;
	},
};

const actions = {
	async loadRounds() {
		const { data } = await roundService.loadRounds();

		const loadedRounds = data;

		const roundIds = loadedRounds.map((round) => round.id);
		const roundEntities = loadedRounds.reduce(
			(entities: { [id: string]: RoundDetail }, round: RoundDetail) => {
				return { ...entities, [round.id]: round };
			},
			{}
		);

		this.ids = roundIds;
		this.entities = roundEntities;
	},
	add(round: Round) {},
	delete(round: Round) {},
	edit(round: Round) {},
	lotterySettings() {},
};

export const useRounds = defineStore('rounds', {
	state,
	getters,
	actions,
});
