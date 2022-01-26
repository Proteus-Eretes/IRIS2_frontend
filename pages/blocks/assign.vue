<template>
    <div class="h-full w-full">
        <div class="assign-container">
            <Panel
                class="max-h-screen min-w-1/3 md:min-w-1/4"
                :showPanel="true"
            >
                <template #header>Available events</template>

                <Draggable
                    :model-value="events.allEvents"
                    :group="{
                        name: 'events',
                        pull: 'clone',
                        put: true,
                        revertClone: true
                    }"
                    item-key="id"
                    class="flex h-full flex-col gap-1"
                    ghost-class="hidden"
                >
                    <template #item="{ element }">
                        <BlocksAssignItem>
                            <p class="grow text-sm">
                                {{ element.code }}
                            </p>

                            <template #number-crews>{{
                                crews.allCrewsByEventId(element.id).length
                            }}</template>
                        </BlocksAssignItem>
                    </template>
                </Draggable>
            </Panel>

            <div
                class="grid w-full grid-flow-row grid-cols-2 items-stretch gap-3 pl-3 md:grid-cols-3"
            >
                <Panel
                    v-for="block in blocks.allBlocks"
                    :key="block.id"
                    class="max-h-1/2-screen"
                >
                    <template #header>Block {{ block.block }}</template>

                    <template
                        v-if="rounds.allRoundsByBlockId(block.id).length > 0"
                    >
                        <div
                            v-for="round in rounds.allRoundsByBlockId(block.id)"
                            :key="round.id"
                        >
                            <fieldset
                                class="rounded-md border-2 border-primary-500 p-1.5"
                            >
                                <legend class="px-1 text-primary-600">
                                    {{ round.name }}
                                </legend>

                                <Draggable
                                    :model-value="
                                        events.allFieldsByRoundId(round.id)
                                    "
                                    :group="{
                                        name: 'rounds',
                                        pull: true,
                                        put: ['events']
                                    }"
                                    @change="
                                        changeList($event, block.id, round.id)
                                    "
                                    item-key="id"
                                    class="flex h-full flex-col gap-1"
                                    ghost-class="assign-event-ghost"
                                >
                                    <template #item="{ element }">
                                        <BlocksAssignItem
                                            v-if="
                                                events.getEventById(
                                                    element.event_id
                                                )
                                            "
                                        >
                                            <p class="grow text-sm">
                                                {{
                                                    events.getEventById(
                                                        element.event_id
                                                    ).code
                                                }}
                                            </p>

                                            <template #number-crews>
                                                {{
                                                    crews.allCrewsByEventId(
                                                        element.event_id
                                                    ).length
                                                }}
                                            </template>
                                        </BlocksAssignItem>
                                    </template>
                                </Draggable>
                            </fieldset>
                        </div>
                    </template>
                    <template v-else>
                        <button
                            type="button"
                            class="button button-secondary w-full"
                            @click="openAssignRounds(block.id)"
                        >
                            Assign round
                        </button>
                    </template>
                </Panel>
            </div>
        </div>

        <EditorSlideOver
            v-model:open="showAssignRound"
            @save="submitAssignRounds"
        >
            <template #header>Assign Rounds</template>
            <template #subheader>Assign the rounds for this block</template>

            <div class="mt-4 space-y-4">
                <div
                    v-for="round in rounds.allRounds"
                    :key="round.id"
                    class="flex items-start"
                >
                    <div class="flex h-5 items-center">
                        <input
                            :id="round.id"
                            :name="round.id"
                            type="checkbox"
                            :value="round.id"
                            v-model="roundList"
                            class="h-4 w-4 rounded border-gray-300 text-secondary-500 focus:ring-secondary-400"
                        />
                    </div>
                    <div class="ml-3 text-sm">
                        <label
                            :for="round.id"
                            class="font-medium text-gray-700"
                        >
                            {{ round.name }}
                        </label>
                    </div>
                </div>
            </div>
        </EditorSlideOver>
    </div>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';
import { useCrewStore } from '~~/stores/crew';

import { Event, Field, NewField } from '~~/models/event';

// Draggable component: https://github.com/SortableJS/vue.draggable.next
import Draggable from 'vuedraggable';

import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

const blocks = useBlockStore();
blocks.loadBlocks();

const events = useEventStore();
events.loadEvents();
events.loadFields();

const rounds = useRoundStore();
rounds.loadRounds();

const crews = useCrewStore();
crews.loadCrews();

const changeList = (evt, blockId: string, roundId: string) => {
    if (evt.added) {
        // console.log('Added', evt.added.element);
        addField(evt.added.element, blockId, roundId);
    } else if (evt.removed) {
        // console.log('Removed', evt.removed.element);
        removeField(evt.removed.element);
    }
};
const addField = (event: Event, blockId: string, roundId: string) => {
    if (
        events
            .allFieldsByRoundId(roundId)
            .findIndex((field: Field) => field.event_id == event.id) != -1
    ) {
        showError('Field already exists');
        return;
    }

    const newField: NewField = {
        block_id: blockId,
        event_id: event.id,
        regatta_id: event.regatta_id,
        round_id: roundId
    };
    events.addField(newField);
};
const removeField = (field: Field) => {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    events.deleteField(field.id);
};

const showAssignRound = ref(false);
const openAssignRounds = (id: string) => {
    showAssignRound.value = true;
    blocks.selectedId = id;
};

const submitAssignRounds = () => {
    rounds.assignRounds(roundList.value);
};
const roundList = ref([]);
</script>

<script lang="ts">
export default defineComponent({
    layout: 'main'
});
</script>

<style scoped>
.assign-event-ghost {
    @apply border-2
        border-dashed
        border-primary-200
        bg-transparent
        text-opacity-0
        shadow-none;
}
</style>
