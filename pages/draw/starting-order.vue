<template>
    <NuxtLayout name="main">
        <div class="flex h-full w-full flex-col gap-3 px-5 py-3">
            <!-- <h2
            class="mt-2 text-lg font-semibold leading-7 text-primary-900 sm:truncate sm:text-xl"
        >
            Starting order
        </h2> -->
            <Panel v-for="round in rounds.allRounds" :key="round.id">
                <template #header>{{ round.name }}</template>

                <template #default>
                    <template
                        v-for="field in events.allFieldsByRound(round.id)"
                        :key="field.id"
                    >
                        <Table
                            :title="
                                events.getEventById(field.event_id)
                                    ? events.getEventById(field.event_id).code
                                    : ''
                            "
                            :headers="fieldTableHeaders"
                            :items="
                                crews
                                    .allTeamsByField(field.id)
                                    .sort(
                                        (a, b) =>
                                            a.starting_order - b.starting_order
                                    )
                            "
                            is-draggable
                        >
                            <template #name="{ item }">
                                <span class="text-sm font-semibold">
                                    {{
                                        crews.getCrewById(item.crew_id)
                                            ? crews.getCrewById(item.crew_id)
                                                  .displayName
                                            : ''
                                    }}
                                </span>
                            </template>

                            <template #club="{ item }">
                                <span class="text-sm">
                                    {{
                                        crews.getCrewById(item.crew_id)
                                            ? crews.getCrewById(item.crew_id)
                                                  .clubName
                                            : ''
                                    }}
                                </span>
                            </template>

                            <template #starting-order="{ item }">
                                <span class="text-sm">
                                    {{ item.starting_order }}
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
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { TableHeader } from '~~/models/table';

const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();

onMounted(async () => {
    await events.loadEvents();
    await events.loadFields();

    await rounds.loadRounds();

    await crews.loadCrews();
    await crews.loadTeams();
});

const fieldTableHeaders: TableHeader[] = [
    { id: 'Name', sortable: false },
    { id: 'Club', sortable: false },
    { id: 'Starting Order', sortable: false },
    { id: 'Toss reason', sortable: false }
];

definePageMeta({
    layout: false
});
</script>
