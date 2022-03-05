<template>
    <NuxtLayout name="main">
        <div class="h-full w-full">
            <div class="moving-container">
                <MovingPanel
                    :index="0"
                    :activePanel="activePanel"
                    @focus="activePanel = 0"
                    v-model:search="crews.query"
                    :search-options="searchOptions"
                    has-search
                >
                    <template #header>Crews</template>

                    <div v-if="crews.allCrews">
                        <Table
                            title="Crews"
                            :headers="tableHeaders"
                            :actions="['edit', 'delete']"
                            :items="sortedCrews"
                            :activeId="crews.selectedCrewId"
                            @item-click="selectCrew($event.id)"
                            @action="performTableAction($event)"
                            has-headers
                            v-model:sort-id="sortId"
                            v-model:sort-direction="sortDirection"
                        >
                            <template #shirt-numbers="{ item }">
                                <span class="badge bg-primary-800 text-white">
                                    {{
                                        crews
                                            .shirtNumbersByCrew(item.id)
                                            .join(', ')
                                    }}
                                </span>
                            </template>

                            <template #name="{ item }">
                                <span class="text-sm font-semibold">
                                    {{ item.displayName }}
                                </span>
                            </template>

                            <template #club="{ item }">
                                <span class="text-sm">
                                    {{ item.clubName }}
                                </span>
                            </template>

                            <template #event="{ item }">
                                <span class="text-sm">
                                    {{
                                        events.getEventById(item.event_id)
                                            ? events.getEventById(item.event_id)
                                                  .code
                                            : 'Nothing'
                                    }}
                                </span>
                            </template>

                            <template #category="{ item }">
                                <span class="text-sm">
                                    {{ item.category ? item.category : '-' }}
                                </span>
                            </template>

                            <template #stroke="{ item }">
                                <span class="text-sm">{{
                                    rowers.strokeByCrew(item.id)
                                        ? rowers.strokeByCrew(item.id).fullName
                                        : 'Nothing'
                                }}</span>
                            </template>

                            <template #status="{ item }">
                                <span class="pill bg-primary-400 text-white">
                                    {{ getCrewStatusLabel(item.status) }}
                                </span>
                            </template>
                        </Table>

                        <div class="flex w-full justify-center p-2">
                            <button
                                type="button"
                                class="button icon-button button-secondary"
                                @click="addCrew()"
                            >
                                <ph-plus class="icon text-gray-400" />
                                <span>Add Crew</span>
                            </button>
                        </div>
                    </div>
                    <div v-else>Nothing</div>
                </MovingPanel>

                <CrewsMovingPanel
                    :index="1"
                    :activePanel="activePanel"
                    @close="deselectCrew()"
                    @focus="activePanel = 1"
                    @select-rower="selectRower($event)"
                />

                <RowersMovingPanel
                    :index="2"
                    :activePanel="activePanel"
                    @close="deselectRower()"
                    @focus="activePanel = 2"
                />
            </div>

            <CrewsSlideOver
                v-model:open="showCrewEditor"
                :state="crewEditorState"
                :data="crewEditorData"
                @save="saveCrewEditor($event)"
                @cancel="cancelCrewEditor()"
            />
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useCrewStore } from '~~/stores/crew';
import { useRowerStore } from '~~/stores/rower';
import { useEventStore } from '~~/stores/event';
import { useClubStore } from '~~/stores/club';

import { CrewStatus, getCrewStatusLabel, NewCrew } from '~~/models/crew';
import { TableHeader, TableSortDirection } from '~~/models/table';
import { Crew } from '~~/models/crew';
import { Event } from '~~/models/event';
import { Rower } from '~~/models/rower';
import { SlideOverState } from '~~/models/slide-over-state';

const regattas = useRegattaStore();
const crews = useCrewStore();
const events = useEventStore();
const clubs = useClubStore();
const rowers = useRowerStore();

await crews.loadCrews();
await crews.loadTeams();
await events.loadEvents();
await rowers.loadRowers();

// The panel that is last opened
const activePanel = ref(0);

const tableHeaders: TableHeader[] = [
    { id: 'Shirt numbers', sortable: false },
    { id: 'Name', sortable: true, sortId: 'displayName' },
    { id: 'Club', sortable: true, sortId: 'clubName' },
    { id: 'Event', sortable: false },
    { id: 'Category', sortable: false },
    { id: 'Stroke', sortable: false },
    { id: 'Status', sortable: false }
];

const performTableAction = (action: { action: string; item: Crew }) => {
    switch (action.action) {
        case 'edit':
            editCrew(action.item.id);
            break;
        case 'delete':
            deleteCrew(action.item.id);
            break;
    }
};

const showCrewEditor = ref(false);
const crewEditorState = ref(SlideOverState.ADD);
const initialCrewEditorData: NewCrew = {
    event_id: '',
    club_id: '',
    regatta_id: '',
    displayName: '',
    shortname: '',
    alternative: '',
    combination: false,
    remarks: '',
    status: CrewStatus.ENTERED
};

const crewEditorData: NewCrew = reactive({
    ...initialCrewEditorData
});

const resetCrewData = (data: NewCrew = initialCrewEditorData) => {
    Object.assign(crewEditorData, data);
};

const addCrew = async () => {
    resetCrewData();

    await clubs.loadClubs();
    crewEditorData.regatta_id = regattas.selectedId;

    crewEditorState.value = SlideOverState.ADD;
    showCrewEditor.value = true;
};
const editCrew = async (id: string) => {
    await clubs.loadClubs();
    crews.selectedCrewId = id;

    await crews.loadSelectedCrew();

    crewEditorState.value = SlideOverState.EDIT;
    showCrewEditor.value = true;

    const c = crews.selectedCrew;
    const cD = crews.selectedCrewDetail;

    resetCrewData({
        event_id: c.event_id,
        club_id: c.club_id,
        regatta_id: c.regatta_id,
        displayName: c.displayName,
        shortname: cD.shortname,
        alternative: cD.alternative,
        combination: cD.combination,
        remarks: cD.remarks,
        status: c.status
    });
};
const deleteCrew = (id: string) => {
    const c = window.confirm('Are you sure you want to delete this crew?');
    if (c) crews.deleteCrew(id);
};

const saveCrewEditor = (data: NewCrew) => {
    switch (crewEditorState.value) {
        case SlideOverState.ADD:
            crews.addCrew(data);
            break;
        case SlideOverState.EDIT:
            crews.editCrew(crews.selectedCrewId, data);
            crews.selectedCrewId = null;
            break;
    }
};
const cancelCrewEditor = () => {
    crews.selectedCrewId = null;
};

const sortId = ref(tableHeaders[1].sortId);
const sortDirection = ref(TableSortDirection.DOWN);

const sortedCrews = computed(() => {
    const elements = crews.queryResults;

    if (!elements) {
        return null;
    }

    if (!sortId.value) {
        return elements;
    }

    return elements.sort((a: Crew, b: Crew) => {
        const key = sortId.value;
        var valueA = a[key];
        var valueB = b[key];

        if (!valueA || !valueB) return 0;

        var valueA = valueA.toUpperCase();
        var valueB = valueB.toUpperCase();

        if (valueA < valueB) {
            return sortDirection.value == TableSortDirection.DOWN ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortDirection.value == TableSortDirection.DOWN ? 1 : -1;
        }

        // names must be equal
        return 0;
    });
});

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const searchOptions = computed(() => {
    const allCrews = crews.allCrews.map((crew: Crew) => crew.displayName);
    const allEvents = events.allEvents.map((event: Event) => event.code);
    const allStrokes = rowers.allRowers
        .filter((rower: Rower) => rower.position == 8)
        .map((rower: Rower) => rower.fullName);

    return [...allCrews, ...allEvents, ...allStrokes];
});

const selectCrew = async (id: string) => {
    activePanel.value = 1;
    params.crew = id;

    crews.selectedCrewId = id;
    clubs.selectedId = crews.selectedCrew.club_id;
    events.selectedEventId = crews.selectedCrew.event_id;

    // await rowers.loadRowersByCrew();
    await crews.loadFinesByCrew();

    await clubs.loadSelectedClub();
};
const selectRower = async (id: string) => {
    activePanel.value = 2;
    params.rower = id;

    rowers.selectedId = id;

    await rowers.loadSelectedRower();
};

const deselectCrew = () => {
    activePanel.value = 0;

    crews.selectedCrewId = null;

    delete params.crew;
};
const deselectRower = () => {
    activePanel.value = 1;

    rowers.selectedId = null;

    delete params.rower;
};

// If the queries are set in the router, select the items
onMounted(async () => {
    const { crew, rower } = params;

    if (crew && typeof crew == 'string') await selectCrew(crew);
    if (rower && typeof rower == 'string') await selectRower(rower);
});

definePageMeta({
    layout: false
});
</script>
