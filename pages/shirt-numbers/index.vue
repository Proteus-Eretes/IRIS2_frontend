<template>
    <NuxtLayout name="main">
        <div class="flex w-full gap-3 px-5 py-3">
            <div class="panel-container">
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

                            <template #fields="{ item }">
                                <span class="text-sm">
                                    {{
                                        events.allFieldsByBlock(item.id).length
                                    }}
                                    fields
                                </span>
                            </template>

                            <template #crews="{ item }">
                                <span class="text-sm">
                                    {{ crews.allTeamsByBlock(item.id).length }}
                                    fields
                                </span>
                            </template>

                            <template #shirt-numbers="{ item }">
                                <span class="text-sm">{{
                                    crews.allTeamsByBlock(item.id)
                                        ? getShirtNumbers(item.id)
                                        : '-'
                                }}</span>
                            </template>

                            <template #status="{ item }">
                                <span class="pill bg-primary-400 text-white">
                                    {{ getBlockStatusLabel(item.status) }}
                                </span>
                            </template>
                        </Table>

                        <div class="flex w-full justify-center p-2">
                            <button
                                type="button"
                                class="button icon-button button-secondary"
                                @click="showCalculation = true"
                            >
                                <ph-list-numbers class="icon text-gray-400" />
                                <span>Calculate numbers</span>
                            </button>
                        </div>
                    </template>
                </Panel>
            </div>

            <ShirtNumberCalculationSlideOver
                v-model:open="showCalculation"
                @save="crews.calculateShirtNumbers"
            />
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { PhListNumbers } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { getBlockStatusLabel } from '~~/models/block';

import { TableHeader } from '~~/models/table';

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

const showCalculation = ref(false);
const blockTableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Fields', sortable: false },
    { id: 'Crews', sortable: false },
    { id: 'Shirt numbers', sortable: false },
    { id: 'Status', sortable: false }
];

const getShirtNumbers = (id: string) => {
    const allTeams = crews.allTeamsByBlock(id);
    const first = useHead(allTeams);
    const last = useLast(allTeams);
    return first && last ? `${first.shirt_number}-${last.shirt_number}` : '';
};

definePageMeta({
    layout: false
});
</script>
