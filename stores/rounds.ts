import { defineStore } from 'pinia';
import { useBlocks } from './blocks';

import { Round } from '~~/types/round.model';

import roundService from '~~/services/round.service';

interface RoundState {
	ids: string[];
	entities: { [id: string]: Round };
	selectedId: string | null;
}

export const useRounds = defineStore('rounds', {
	state: (): RoundState => ({
		ids: [],
		entities: {},
		selectedId: null,
	}),

	getters: {
		allRounds(state: RoundState) {
			return state.ids.map((id: string) => state.entities[id]);
		},
		allRoundsOfSelectedBlock(state: RoundState) {
			const allRounds = state.ids.map((id: string) => state.entities[id]);
			const selectedBlockId = useBlocks().selectedId;

			return allRounds.filter(
				(round: Round) => round.block_id == selectedBlockId
			);
		},
		allRoundsByBlockId(state: RoundState) {
			const allRounds = state.ids.map((id: string) => state.entities[id]);

			return (id: string) => {
				return allRounds.filter((round: Round) => round.block_id == id);
			};
		},
		selectedRound(state: RoundState) {
			return (
				(state.selectedId && state.entities[state.selectedId]) || null
			);
		},
		getRoundById(state: RoundState) {
			return (id: string) => {
				return (id && state.entities[id]) || undefined;
			};
		},
	},

	actions: {
		async loadRounds() {
			const loadedRounds = await roundService.loadRounds();

			const roundIds = loadedRounds.map((round) => round.id);
			const roundEntities = loadedRounds.reduce(
				(entities: { [id: string]: Round }, round: Round) => {
					return { ...entities, [round.id]: round };
				},
				{}
			);

			this.ids = roundIds;
			this.entities = roundEntities;
		},
		async loadRoundsByBlock() {
			const blockId = useBlocks().selectedId;
			// FIXME ERROR
			if (blockId == null) return;

			const loadedRounds = await roundService.loadRoundsByBlock(blockId);

			const roundIds = loadedRounds.map((round) => round.id);
			const roundEntities = loadedRounds.reduce(
				(entities: { [id: string]: Round }, round: Round) => {
					return { ...entities, [round.id]: round };
				},
				{}
			);

			this.ids = roundIds;
			this.entities = roundEntities;
		},
		assignRounds(list: string[]) {
			const blockId = useBlocks().selectedId;

			// FIXME Ik weet niet precies of het dit moet doen, maar ja
			list.forEach((id: string) => {
				this.entities[id].block_id = blockId;
			});
		},
		add(round: Round) {},
		delete(round: Round) {},
		edit(round: Round) {},
		lotterySettings() {},
	},
});
