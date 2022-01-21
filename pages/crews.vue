<template>
    <div class="w-full h-full">
        <div class="sliding-container">
            <SlidingPanel
                :index="0"
                :activePanel="activePanel"
                @focus="activePanel = 0"
                v-model:search="crews.query"
                :search-options="searchOptions"
                has-search
            >
                <template #header>Crews</template>

                <div v-if="crews.allCrews">
                    <!-- FIXME: do the action -->
                    <Table
                        title="Crews"
                        :headers="tableHeaders"
                        :items="sortedCrews"
                        :activeId="crews.selectedCrewId"
                        @item-click="selectCrew($event.id)"
                        @action=""
                        has-headers
                        v-model:sort-id="sortId"
                        v-model:sort-direction="sortDirection"
                    >
                        <template #shirt-numbers="{ item }">
                            <span class="badge text-white bg-primary-800">
                                {{
                                    crews
                                        .getShirtNumberByCrew(item.id)
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
                                rowers.getStrokeByCrew(item.id)
                                    ? rowers.getStrokeByCrew(item.id).fullName
                                    : 'Nothing'
                            }}</span>
                        </template>

                        <template #status="{ item }">
                            <span class="pill text-white bg-primary-400">
                                {{ getCrewStatusLabel(item.status) }}
                            </span>
                        </template>
                    </Table>

                    <div class="w-full p-2 flex justify-center">
                        <button
                            type="button"
                            class="button icon-button button-secondary"
                            @click="openAddCrew"
                        >
                            <ph-plus class="icon text-gray-400" />
                            <span>Add Crew</span>
                        </button>
                    </div>
                </div>
                <div v-else>Nothing</div>
            </SlidingPanel>

            <CrewsSlidingPanel
                :index="1"
                :activePanel="activePanel"
                @close="deselectCrew()"
                @focus="activePanel = 1"
                @select-rower="selectRower($event)"
            />

            <RowersSlidingPanel
                :index="2"
                :activePanel="activePanel"
                @close="deselectRower()"
                @focus="activePanel = 2"
            />
        </div>

        <CrewsAddSlideOver
            v-model:open="showAddCrew"
            :regatta="regattas.selectedId"
        />
    </div>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useCrewStore } from '~~/stores/crew';
import { useRowerStore } from '~~/stores/rower';
import { useEventStore } from '~~/stores/event';
import { useClubStore } from '~~/stores/club';

import { getCrewStatusLabel } from '~~/types/crew.model';
import { TableHeader } from '~~/types/table-header.model';
import { TableSortDirection } from '~~/types/table-sort-direction.model';
import { Crew } from '~~/types/crew.model';
import { Event } from '~~/types/event.model';
import { Rower } from '~~/types/rower.model';

const regattas = useRegattaStore();
const crews = useCrewStore();
const events = useEventStore();
const clubs = useClubStore();
const rowers = useRowerStore();

// TODO: leg uit waarom alles meteen laden
await crews.loadCrews();
await crews.loadTeams();
await events.loadEvents();
// await clubs.loadClubs();
await rowers.loadRowers();

// The panel that is last opened
const activePanel = ref(0);
const showAddCrew = ref(false);

const openAddCrew = () => {
    showAddCrew.value = true;
    clubs.loadClubs();
};

const tableHeaders: TableHeader[] = [
    { id: 'Shirt numbers', sortable: false },
    { id: 'Name', sortable: true, sortId: 'displayName' },
    { id: 'Club', sortable: true, sortId: 'clubName' },
    { id: 'Event', sortable: false },
    { id: 'Category', sortable: false },
    { id: 'Stroke', sortable: false },
    { id: 'Status', sortable: false }
];

const sortId = ref(tableHeaders[0].id);
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

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
onMounted(async () => {
    const router = useRouter();
    const { crew, rower } = router.currentRoute.value.query;

    if (crew && typeof crew == 'string') await selectCrew(crew);
    if (rower && typeof rower == 'string') await selectRower(rower);
});
</script>

<script lang="ts">
export default defineComponent({
    layout: 'main'
});
</script>
