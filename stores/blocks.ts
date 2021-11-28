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

import { Block, BlockDetail } from '~~/types/block.model';
import blockService from '~~/services/block.service';

interface BlockState {
	ids: string[];
	entities: { [id: string]: Block };
	detailIds: string[];
	detailEntities: { [id:string]: BlockDetail };
	selectedId: string | null;
}

const state = (): BlockState => ({
	ids: [],
	entities: {},
	detailIds: [],
	detailEntities: {},
	selectedId: null,
});

const getters = {
	getAllBlocks(state: BlockState) {
		return state.ids.map((id: string) => state.entities[id]);
	},
	getBlockDetails(state: BlockState) {
		return state.detailIds.map((id: string) => state.detailEntities[id]);
	},
	getSelectedBlock(state: BlockState) {
		return (state.selectedId && state.entities[state.selectedId]) || null;
	},
};

const actions = {
	async loadBlocks() {
		const { data } = await blockService.loadBlocks();

		const loadedBlocks = data;

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
	async loadBlockDetails() {
		const { data } = await blockService.loadBlockDetails();

		const loadedBlocks = data;

		const blockIds = loadedBlocks.map((block) => block.id);
		const blockEntities = loadedBlocks.reduce(
			(entities: { [id: string]: Block }, block: Block) => {
				return { ...entities, [block.id]: block };
			},
			{}
		);

		this.detailIds = blockIds;
		this.detailEntities = blockEntities;
	},
	selectBlock(id: string) {
		this.selectedId = id;
	},
	add(block: Block) {},
	delete(block: Block) {},
	edit(block: Block) {},
	lotterySettings() {},
};

export const useBlocks = defineStore('blocks', {
	state,
	getters,
	actions,
});