<template>
    <NuxtLayout name="main">
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
                                :disabled="
                                    item.status >= BlockStatus.START_ORDER
                                "
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

            <BlocksDrawSlideOver v-model:open="showDraw" />
        </div>
    </NuxtLayout>
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

onMounted(async () => {
    await blocks.loadBlocks();

    await events.loadEvents();
    await events.loadFields();

    await rounds.loadRounds();

    await crews.loadCrews();
    await crews.loadTeams();
});

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

definePageMeta({
    layout: false
});
</script>
