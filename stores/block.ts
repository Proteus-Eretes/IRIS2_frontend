import { defineStore } from 'pinia';
import { useRegattaStore } from './regatta';

import { Block, NewBlock } from '~/models/block';
import { useBlockService } from '~/composables/useBlockService';
const blockService = useBlockService();

import { useToastService } from '~/composables/useToastService';
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

            try {
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
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the blocks');
            }
        },
        async add(newBlock: NewBlock) {
            try {
                const block = await blockService.addBlock(newBlock);

                this.ids = [...this.ids, block.id];
                this.entities = {
                    ...this.entities,
                    [block.id]: block
                };
            } catch (error) {
                console.error(error);
                showError('Something went wrong adding the new block');
            }
        },
        delete(id: string) {
            this.ids.splice(this.ids.indexOf(id), 1);
            delete this.entities[id];
        },
        async edit(id: string, data: NewBlock) {
            try {
                this.entities[id] = await blockService.editBlock(id, data);
            } catch (error) {
                console.error(error);
                showError('Something went wrong editing the block');
            }
        }
    }
});
