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

                    <template #fields="{ item }">
                        <span class="text-sm">
                            {{ events.allFieldsByBlockId(item.id).length }}
                            fields
                        </span>
                    </template>

                    <template #status="{ item }">
                        <span class="pill bg-primary-400 text-white">
                            {{ getBlockStatusLabel(item.status) }}
                        </span>
                    </template>
                </Table>
            </template>
        </Panel>

        <h2
            class="mt-2 text-lg font-semibold leading-7 text-primary-900 sm:truncate sm:text-xl"
        >
            Overview
        </h2>
        <Panel v-for="block in blocks.allBlocks" :key="block.id">
            <template #header>Block {{ block.block }}</template>

            <template #default>
                <template
                    v-for="field in events.allFieldsByBlockId(block.id)"
                    :key="field.id"
                >
                    <Table
                        :title="
                            events.getEventById(field.event_id)
                                ? events.getEventById(field.event_id).code
                                : ''
                        "
                        :actions="['edit']"
                        :headers="crewTableHeaders"
                        :items="crews.allTeamsByFieldId(field.id)"
                        has-headers
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

                        <template #starting-order="{ item }">
                            <span class="text-sm">
                                {{ item.starting_order }}
                            </span>
                        </template>

                        <template #shirt-number="{ item }">
                            <span class="text-sm">
                                {{ item.shirt_number }}
                            </span>
                        </template>
                    </Table>
                </template>
            </template>
        </Panel>
    </div>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { BlockStatus, getBlockStatusLabel } from '~~/models/block';

import { TableHeader } from '~~/models/table';

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

const blockTableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Fields', sortable: false },
    { id: 'Crews', sortable: false },
    { id: 'Shirt numbers', sortable: false },
    { id: 'Status', sortable: false }
];
const crewTableHeaders: TableHeader[] = [
    { id: 'Name', sortable: false },
    { id: 'Club', sortable: false },
    { id: 'Starting order', sortable: false },
    { id: 'Shirt number', sortable: false }
];

definePageMeta({
    layout: 'main'
});
</script>
