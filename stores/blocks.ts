// add

// assign

// assignEvent

// unAssignEvent

// assignRounds

// delete

// drawBlock

// drawLots

// edit

// getBlockInformation

// getBlocks

// getDrawBlock

// index

// showDrawnLots

// startingOrderUpdate

import { defineStore } from 'pinia';

import { Block } from '~~/types/block.model';
import blockService from '~~/services/block.service';
import { useRegattas } from './regattas';

interface BlockState {
	ids: string[];
	entities: { [id: string]: Block };
	selectedId: string | null;
}

export const useBlocks = defineStore('blocks', {
	state: (): BlockState => ({
		ids: [],
		entities: {},
		selectedId: null,
	}),

	getters: {
		allBlocks(state: BlockState) {
			return state.ids.map((id: string) => state.entities[id]);
		},
		selectedBlock(state: BlockState) {
			return (
				(state.selectedId && state.entities[state.selectedId]) || null
			);
		},
	},

	actions: {
		async loadBlocks() {
			const regattaId = useRegattas().selectedId;
			// FIXME ERROR
			if (regattaId == null) return;

			const loadedBlocks = await blockService.loadBlocks(regattaId);

			const blockIds = loadedBlocks.map((block) => block.id);
			const blockEntities = loadedBlocks.reduce(
				(entities: { [id: string]: Block }, block: Block) => {
					return { ...entities, [block.id]: block };
				},
				{}
			);

			this.ids = blockIds;
			this.entities = blockEntities;
		},
		add(block: Block) {},
		delete(block: Block) {},
		edit(block: Block) {},
		lotterySettings() {},
	},
});
