// add

// assign

// assignEvent

// unAssignEvent

// assignRounds

// delete

// drawBlock

// drawLots

// edit

// getDrawBlock

// showDrawnLots

// startingOrderUpdate

import { defineStore } from 'pinia';
import { useRegattaStore } from './regatta';

import { Block } from '~~/types/block.model';
import { useBlockService } from '~~/composables/useBlockService';
const blockService = useBlockService();

import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

interface BlockState {
	ids: string[];
	entities: { [id: string]: Block };
	selectedId: string | null;
}

export const useBlockStore = defineStore('blocks', {
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
			const regattaId = useRegattaStore().selectedId;
			if (regattaId == null) {
				showError('No regatta selected');
				return;
			}

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
