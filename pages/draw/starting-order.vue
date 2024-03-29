<template>
    <NuxtLayout name="main">
        <div class="flex h-full w-full flex-col gap-3 px-5 py-3">
            <div class="panel-container">
                <!-- Blocks (collapse) -> Rounds -> Events -> Teams -->
                <template
                    v-for="(block, index) in blocks.allBlocks"
                    :key="block.id"
                >
                    <Accordion
                        :selected-accordion="selectedAccordion"
                        @update:index="selectedAccordion = $event"
                        :index="index"
                    >
                        <template #header>Block {{ block.block }}</template>

                        <template #items>
                            <template
                                v-for="round in rounds.allRoundsByBlock(
                                    block.id
                                )"
                                :key="round.id"
                            >
                                <fieldset
                                    class="flex flex-col gap-3 rounded-md border-2 border-primary-500 px-2 pb-3"
                                >
                                    <legend class="p-1 text-primary-600">
                                        {{ round.name }}
                                    </legend>

                                    <template
                                        v-for="field in events.allFieldsByRound(
                                            round.id
                                        )"
                                        :key="field.id"
                                    >
                                        <Panel
                                            :has-padding="
                                                !crews.allTeamsByField(field.id)
                                                    .length
                                            "
                                        >
                                            <template #header>
                                                {{
                                                    events.getEventById(
                                                        field.event_id
                                                    )
                                                        ? events.getEventById(
                                                              field.event_id
                                                          ).code
                                                        : ''
                                                }}
                                            </template>

                                            <TableDraggable
                                                :title="
                                                    events.getEventById(
                                                        field.event_id
                                                    )
                                                        ? events.getEventById(
                                                              field.event_id
                                                          ).code
                                                        : ''
                                                "
                                                :headers="tableHeaders"
                                                has-headers
                                                :items="
                                                    crews.allTeamsByField(
                                                        field.id
                                                    )
                                                "
                                                @drag="dragTeams"
                                            >
                                                <template #name="{ item }">
                                                    <span
                                                        class="text-sm font-semibold"
                                                    >
                                                        {{
                                                            crews.getCrewById(
                                                                item.crew_id
                                                            )
                                                                ? crews.getCrewById(
                                                                      item.crew_id
                                                                  ).displayName
                                                                : ''
                                                        }}
                                                    </span>
                                                </template>

                                                <template #club="{ item }">
                                                    <span class="text-sm">
                                                        {{
                                                            crews.getCrewById(
                                                                item.crew_id
                                                            )
                                                                ? crews.getCrewById(
                                                                      item.crew_id
                                                                  ).clubName
                                                                : ''
                                                        }}
                                                    </span>
                                                </template>

                                                <template
                                                    #starting-order="{ item }"
                                                >
                                                    <span class="text-sm">
                                                        {{
                                                            item.starting_order
                                                        }}
                                                    </span>
                                                </template>

                                                <template
                                                    #toss-reason="{ item }"
                                                >
                                                    <span class="text-sm">
                                                        {{
                                                            // FIXME: Replace weghalen
                                                            item.toss_reason.replace(
                                                                /( starting number: \d+)/g,
                                                                ''
                                                            )
                                                        }}
                                                    </span>
                                                </template>
                                            </TableDraggable>
                                        </Panel>
                                    </template>
                                </fieldset>
                            </template>

                            <div
                                v-if="!rounds.allRoundsByBlock(block.id).length"
                                class="font-base px-1 text-sm text-gray-500"
                            >
                                No rounds found
                            </div>
                        </template>
                    </Accordion>
                </template>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';
import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

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

const selectedAccordion = ref(0);
const tableHeaders: TableHeader[] = [
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
