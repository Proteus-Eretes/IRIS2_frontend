// assign

// assignEvent

// unAssignEvent

// assignRounds

// drawBlock

// drawLots

// getDrawBlock

// showDrawnLots

// startingOrderUpdate

import { defineStore } from 'pinia';
import { useRegattaStore } from './regatta';

import { Block, NewBlock } from '~~/models/block';
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
        selectedId: null
    }),

    getters: {
        allBlocks(state: BlockState) {
            return state.ids
                .map((id: string) => state.entities[id])
                .sort((a: Block, b: Block) => a.block - b.block);
        },
        selectedBlock(state: BlockState) {
            return (
                (state.selectedId && state.entities[state.selectedId]) || null
            );
        }
    },

    actions: {
        async loadBlocks() {
            const regattaId = useRegattaStore().selectedId;
            if (regattaId == null) {
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
        async add(newBlock: NewBlock) {
            const block = await blockService.addBlock(newBlock);

            this.ids = [...this.ids, block.id];
            this.entities = {
                ...this.entities,
                [block.id]: block
            };
        },
        delete(id: string) {
            this.ids.splice(this.ids.indexOf(id), 1);
            delete this.entities[id];
        },
        async edit(id: string, data: NewBlock) {
            const editedRower = await blockService.editBlock(id, data);

            this.entities[id] = editedRower;
        }
    }
});
