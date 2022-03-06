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
                        <TableDraggable
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
                            @drag="dragTeams"
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
                        </TableDraggable>
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

const dragTeams = ({
    id,
    oldIndex,
    newIndex
}: {
    id: string;
    oldIndex: number;
    newIndex: number;
}) => {
    const oldNumber = oldIndex + 1;
    const newNumber = newIndex + 1;
    const direction = Math.max(-1, Math.min(1, newNumber - oldNumber)); // -1 is hoger in de lijst (meer op nummer 1/0) en +1 is lager in de lijst

    for (const i in crews.teamEntities) {
        if (i === id) continue;

        if (Object.prototype.hasOwnProperty.call(crews.teamEntities, i)) {
            const el = crews.teamEntities[i];

            if (
                direction > 0 &&
                (el.starting_order <= oldNumber ||
                    el.starting_order > newNumber)
            )
                continue;
            else if (
                direction < 0 &&
                (el.starting_order >= oldNumber ||
                    el.starting_order < newNumber)
            )
                continue;

            crews.editStartingOrder(i, el.starting_order - direction);
        }
    }

    crews.editStartingOrder(id, newNumber);
};

definePageMeta({
    layout: false
});
</script>
