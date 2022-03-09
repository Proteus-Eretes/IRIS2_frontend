<template>
    <NuxtLayout name="main">
        <div class="flex h-full w-full flex-col gap-3 px-5 py-3">
            <Panel has-padding>
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
                                {{ events.allFieldsByBlock(item.id).length }}
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
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { getBlockStatusLabel } from '~~/models/block';

import { TableHeader } from '~~/models/table';

const blocks = useBlockStore();
const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();

onMounted(async () => {
    await blocks.loadBlocks();

    await events.loadEvents();
    await events.loadFields();

    await rounds.loadRounds();

    await crews.loadCrews();
    await crews.loadTeams();
});

const blockTableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Fields', sortable: false },
    { id: 'Crews', sortable: false },
    { id: 'Shirt numbers', sortable: false },
    { id: 'Status', sortable: false }
];

definePageMeta({
    layout: false
});
</script>
