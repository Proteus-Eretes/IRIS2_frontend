<template>
    <NuxtLayout name="main">
        <div class="grid w-full grid-cols-2/3 gap-3 px-5 py-3">
            <Panel>
                <template #header>Blocks</template>

                <template #default>
                    <Table
                        title="Blocks"
                        :headers="blockTableHeaders"
                        :items="blocks.allBlocks"
                        has-headers
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
                                        : 'Draw separately'
                                }}
                            </button>
                        </template>
                    </Table>
                </template>
            </Panel>

            <Panel has-padding>
                <template #header>Draw all</template>
            </Panel>

            <BlocksDrawSlideOver v-model:open="showDraw" />
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { BlockStatus } from '~~/models/block';

import { useDateFormatter } from '~~/composables/useDateFormatter';
import { TableHeader } from '~~/models/table';

const { formatDate, formatTime } = useDateFormatter();

const regattas = useRegattaStore();
const blocks = useBlockStore();
const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();

onMounted(async () => {
    const { regatta: regattaId } = useUrlSearchParams();
    regattas.selectedId = regattaId as string;

    await blocks.loadBlocks();

    await events.loadEvents();
    await events.loadFields();

    await rounds.loadRounds();

    await crews.loadCrews();
    await crews.loadTeams();
});

const showDraw = ref(false);
const blockTableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Start date', sortable: false },
    { id: 'Start time', sortable: false },
    { id: 'Button', sortable: false }
];

const draw = (id: string) => {
    showDraw.value = true;
    blocks.selectedId = id;
};

definePageMeta({
    layout: false
});
</script>
