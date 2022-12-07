import { defineStore } from 'pinia';
import { useBlockStore } from './block';

import { Round } from '~/models/round';
import { useRoundService } from '~/composables/useRoundService';
const roundService = useRoundService();

import { useToastService } from '~/composables/useToastService';
const { showError } = useToastService();

interface RoundState {
    ids: string[];
    entities: { [id: string]: Round };
    selectedId: string | null;
}

export const useRoundStore = defineStore('rounds', {
    state: (): RoundState => ({
        ids: [],
        entities: {},
        selectedId: null
    }),

    getters: {
        allRounds(state: RoundState) {
            return state.ids.map((id: string) => state.entities[id]);
        },
        allRoundsByBlock(state: RoundState) {
            const allRounds = state.ids.map((id: string) => state.entities[id]);
            const selectedId = useBlockStore().selectedId;

            return (id: string = selectedId) => {
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
        }
    },

    actions: {
        async loadRounds() {
            try {
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
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the rounds');
            }
        },
        async loadRoundsByBlock() {
            const blockId = useBlockStore().selectedId;
            if (blockId == null) {
                showError('No block selected');
                return;
            }

            try {
                const loadedRounds = await roundService.loadRoundsByBlock(
                    blockId
                );

                const roundIds = loadedRounds.map((round) => round.id);
                const roundEntities = loadedRounds.reduce(
                    (entities: { [id: string]: Round }, round: Round) => {
                        return { ...entities, [round.id]: round };
                    },
                    {}
                );

                this.ids = roundIds;
                this.entities = roundEntities;
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the rounds');
            }
        },
        assignRounds(list: string[]) {
            const blockId = useBlockStore().selectedId;

            // FIXME: Ik weet niet precies of het dit moet doen
            list.forEach((id: string) => {
                this.entities[id].block_id = blockId;
            });
        }
    }
});
