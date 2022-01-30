<template>
    <div class="flex h-full w-full flex-col gap-3 px-5 py-3">
        <Panel>
            <template #header>Blocks</template>

            <template #default>
                <Table
                    title="Blocks"
                    :headers="blockTableHeaders"
                    :items="blocks.allBlocks"
                >
                    <template #block="{ item }">
                        <span class="badge bg-primary-800 text-white">
                            {{ item.block }}
                        </span>
                    </template>

                    <template #start-date="{ item }">
                        <span class="text-sm">
                            {{ formatDate(item.start_time) }}
                        </span>
                    </template>

                    <template #start-time="{ item }">
                        <span class="text-sm">
                            {{ formatTime(item.start_time) }}
                        </span>
                    </template>

                    <template #button="{ item }">
                        <button
                            type="button"
                            class="button button-primary w-auto py-1 px-3"
                            @click="draw(item.id)"
                            :disabled="item.status >= BlockStatus.START_ORDER"
                        >
                            {{
                                item.status >= BlockStatus.START_ORDER
                                    ? 'Drawn'
                                    : 'Draw lots'
                            }}
                        </button>
                    </template>
                </Table>
            </template>
        </Panel>

        <h2
            class="mt-2 text-lg font-semibold leading-7 text-primary-900 sm:truncate sm:text-xl"
        >
            Starting order
        </h2>
        <Panel v-for="round in rounds.allRounds" :key="round.id">
            <template #header>{{ round.name }}</template>

            <template #default>
                <template
                    v-for="field in events.allFieldsByRoundId(round.id)"
                    :key="field.id"
                >
                    <Table
                        :title="
                            events.getEventById(field.event_id)
                                ? events.getEventById(field.event_id).code
                                : ''
                        "
                        :headers="fieldTableHeaders"
                        :items="crews.allTeamsByFieldId(field.id)"
                    >
                        <template #name="{ item }">
                            <span class="text-sm font-semibold">
                                {{
                                    crews.getCrewById(item.crew_id).displayName
                                }}
                            </span>
                        </template>

                        <template #club="{ item }">
                            <span class="text-sm">
                                {{ crews.getCrewById(item.crew_id).clubName }}
                            </span>
                        </template>

                        <template #toss-reason="{ item }">
                            <span class="text-sm">
                                {{ item.toss_reason }}
                            </span>
                        </template>
                    </Table>
                </template>
            </template>
        </Panel>

        <BlocksDrawSlideOver v-model:open="showDraw" />
    </div>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { BlockStatus } from '~~/models/block';

import { useDateFormatter } from '~~/composables/useDateFormatter';
import { TableHeader } from '~~/models/table';

const { formatDate, formatTime } = useDateFormatter();

const blocks = useBlockStore();
const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();

blocks.loadBlocks();

events.loadEvents();
events.loadFields();

rounds.loadRounds();

crews.loadCrews();
crews.loadTeams();

const showDraw = ref(false);

const draw = (id: string) => {
    showDraw.value = true;
    blocks.selectedId = id;
};

const blockTableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Start date', sortable: false },
    { id: 'Start time', sortable: false },
    { id: 'Button', sortable: false }
];
const fieldTableHeaders: TableHeader[] = [
    { id: 'Name', sortable: false },
    { id: 'Club', sortable: false },
    { id: 'Shortname', sortable: false },
    { id: 'Toss reason', sortable: false }
];

definePageMeta({
    layout: 'main'
});
</script>
