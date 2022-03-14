<template>
    <NuxtLayout name="main">
        <div class="flex h-full w-full flex-col gap-3 px-5 py-3">
            <AccordionContainer>
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

                                            <Table
                                                :title="
                                                    events.getEventById(
                                                        field.event_id
                                                    )
                                                        ? events.getEventById(
                                                              field.event_id
                                                          ).code
                                                        : ''
                                                "
                                                :actions="['edit']"
                                                @action="
                                                    performTableAction($event)
                                                "
                                                :headers="tableHeaders"
                                                :items="
                                                    crews.allTeamsByField(
                                                        field.id
                                                    )
                                                "
                                                has-headers
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
                                                    #shirt-number="{ item }"
                                                >
                                                    <span class="text-sm">
                                                        {{ item.shirt_number }}
                                                    </span>
                                                </template>
                                            </Table>
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
            </AccordionContainer>
        </div>

        <ShirtNumberEditSlideOver
            v-model:open="showShirtNumberEditor"
            :data="shirtNumberEditorData"
            @save="saveShirtNumberEditor($event)"
            @cancel="cancelShirtNumberEditor()"
        />
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';
import { useBlockStore } from '~~/stores/block';
import { useRoundStore } from '~~/stores/round';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { TableHeader } from '~~/models/table';
import { NewShirtNumber, Team } from '~~/models/crew';

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
    { id: 'Starting order', sortable: false },
    { id: 'Shirt number', sortable: false }
];

const performTableAction = (action: { action: string; item: Team }) => {
    switch (action.action) {
        case 'edit':
            editShirtNumber(action.item.id);
            break;
    }
};

const showShirtNumberEditor = ref(false);
const initialShirtNumberEditorData: NewShirtNumber = {
    shirt_number: 0
};

const shirtNumberEditorData: NewShirtNumber = reactive({
    ...initialShirtNumberEditorData
});

const resetShirtNumberData = (
    data: NewShirtNumber = initialShirtNumberEditorData
) => {
    Object.assign(shirtNumberEditorData, data);
};

const editShirtNumber = async (id: string) => {
    crews.selectedTeamId = id;

    showShirtNumberEditor.value = true;

    const r = crews.selectedTeam;

    resetShirtNumberData({
        shirt_number: r.shirt_number
    });
};

const saveShirtNumberEditor = (data: NewShirtNumber) => {
    crews.editShirtNumber(crews.selectedTeamId, data.shirt_number);
    crews.selectedTeamId = null;
};
const cancelShirtNumberEditor = () => {
    crews.selectedTeamId = null;
};

definePageMeta({
    layout: false
});
</script>
