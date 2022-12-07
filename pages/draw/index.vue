<template>
    <NuxtLayout name="main">
        <div class="flex w-full gap-3 px-5 py-3">
            <div class="panel-container">
                <Panel>
                    <template #header>Blocks</template>
                    <template #header-button>
                        <a
                            @click="showDrawSettings = true"
                            title="Draw settings"
                        >
                            <Icon
                                name="ph:faders-horizontal"
                                class="font-bold text-white"
                            />
                            <span class="sr-only">Draw settings</span>
                        </a>
                    </template>

                    <template #default>
                        <Table
                            title="Blocks"
                            :headers="tableHeaders"
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

                            <template #status="{ item }">
                                <span
                                    v-if="
                                        item.status >= BlockStatus.START_ORDER
                                    "
                                    class="pill border border-gray-200 bg-white text-primary-400"
                                >
                                    Drawn
                                </span>
                                <span
                                    v-else
                                    class="pill bg-warning-500 text-white"
                                >
                                    Undrawn
                                </span>
                            </template>
                        </Table>

                        <div class="flex w-full justify-center p-2">
                            <button
                                type="button"
                                class="button icon-button button-secondary"
                                @click="showDraw = true"
                            >
                                <Icon name="ph:coin-vertical" class="text-gray-400" />
                                <span>Draw lots</span>
                            </button>
                        </div>
                    </template>
                </Panel>
            </div>

            <DrawSlideOver v-model:open="showDraw" />

            <DrawSettingsSlideOver
                v-model:open="showDrawSettings"
                :data="
                    regattas.selectedRegattaDetail
                        ? regattas.selectedRegattaDetail.lottery_settings
                        : null
                "
            />
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';
import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { BlockStatus } from '~~/models/block';

import { useDateFormatter } from '~~/composables/useDateFormatter';
import { TableHeader } from '~~/models/table';

import { useUrlSearchParams } from "@vueuse/core";

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

    await regattas.loadSelectedRegatta();
});

const showDraw = ref(false);
const showDrawSettings = ref(false);

const tableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Start date', sortable: false },
    { id: 'Start time', sortable: false },
    { id: 'Status', sortable: false }
];

definePageMeta({
    layout: false
});
</script>
