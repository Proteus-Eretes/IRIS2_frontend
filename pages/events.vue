<template>
    <div class="w-full h-full">
        <div class="sliding-container">
            <SlidingPanel
                :index="0"
                :activePanel="activePanel"
                @focus="activePanel = 0"
            >
                <template #header>Events</template>

                <template #default>
                    <!-- FIXME: do the action -->
                    <Table
                        title="Events"
                        :headers="tableHeaders"
                        :actions="['edit', 'delete']"
                        :items="events.allEvents"
                        :activeId="events.selectedEventId"
                        @item-click="selectEvent($event.id)"
                        @action=""
                        has-headers
                    >
                        <template #number="{ item }">
                            <span class="badge text-white bg-primary-800">
                                {{ item.number }}
                            </span>
                        </template>

                        <template #day="{ item }">
                            <span class="text-sm">
                                {{ formatDate(item.day) }}
                            </span>
                        </template>

                        <template #code="{ item }">
                            <span class="text-sm">
                                {{ item.code }}
                            </span>
                        </template>

                        <template #name="{ item }">
                            <span class="text-sm font-semibold">
                                {{ item.name }}
                            </span>
                        </template>

                        <template #crews="{ item }">
                            <div class="flex items-center gap-2">
                                <ph-users-three
                                    class="icon text-primary-400"
                                    aria-hidden="true"
                                />

                                <span class="text-xs font-medium">
                                    {{
                                        crews.allCrewsByEventId(item.id)
                                            ? crews.allCrewsByEventId(item.id)
                                                  .length
                                            : 0
                                    }}
                                </span>
                            </div>
                        </template>

                        <template #category="{ item }">
                            <span
                                v-if="item.category"
                                class="pill text-white bg-primary-400"
                            >
                                {{ item.category }}
                            </span>
                        </template>

                        <template #boat-type="{ item }">
                            <span class="text-sm">
                                {{ item.boat_type }}
                            </span>
                        </template>
                    </Table>

                    <div class="w-full p-2 flex justify-center">
                        <button
                            type="button"
                            class="button icon-button button-secondary"
                            @click="showAddEvent = true"
                        >
                            <ph-plus class="icon text-gray-400" />
                            <span>Add Event</span>
                        </button>
                    </div>
                </template>
            </SlidingPanel>

            <EventsSlidingPanel
                :index="1"
                :activePanel="activePanel"
                @close="deselectEvent()"
                @focus="activePanel = 1"
                @select-crew="selectCrew($event)"
            />

            <CrewsSlidingPanel
                :index="2"
                :activePanel="activePanel"
                @close="deselectCrew()"
                @focus="activePanel = 2"
                @select-rower="selectRower($event)"
            />

            <RowersSlidingPanel
                :index="3"
                :activePanel="activePanel"
                @close="deselectRower()"
                @focus="activePanel = 3"
            />
        </div>

        <EditorSlideOver v-model:open="showAddEvent">
            <template #header>Create a new event</template>
            <template #subheader>Create a new event for this regatta</template>
            Hey
        </EditorSlideOver>
    </div>
</template>

<script lang="ts" setup>
import { PhPlus, PhUsersThree } from 'phosphor-vue';

import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRowerStore } from '~~/stores/rower';
import { useClubStore } from '~~/stores/club';

import { useDateFormatter } from '~~/composables/useDateFormatter';
import { TableHeader } from '~~/types/table-header.model';

const { formatDate } = useDateFormatter();

const events = useEventStore();
const crews = useCrewStore();
const rowers = useRowerStore();
const clubs = useClubStore();

await events.loadEvents();
await crews.loadCrews();

// The panel that is last opened
const activePanel = ref(0);
const showAddEvent = ref(false);

const tableHeaders: TableHeader[] = [
    { id: 'Number', sortable: false },
    { id: 'Day', sortable: false },
    { id: 'Code', sortable: false },
    { id: 'Name', sortable: false },
    { id: 'Crews', sortable: false },
    { id: 'Category', sortable: false },
    { id: 'Boat type', sortable: false }
];

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const selectEvent = async (id: string) => {
    activePanel.value = 1;
    params.event = id;

    events.selectedEventId = id;

    // await events.loadSelectedEvent();
};
const selectCrew = async (id: string) => {
    activePanel.value = 2;
    params.crew = id;

    crews.selectedCrewId = id;

    await rowers.loadRowersByCrew();

    clubs.selectedId = crews.selectedCrew.club_id;
    await clubs.loadSelectedClub();
};
const selectRower = async (id: string) => {
    activePanel.value = 3;
    params.rower = id;

    rowers.selectedId = id;

    await rowers.loadSelectedRower();
};

const deselectEvent = () => {
    activePanel.value = 0;

    events.selectedEventId = null;

    delete params.event;
};
const deselectCrew = () => {
    activePanel.value = 1;

    crews.selectedCrewId = null;

    delete params.crew;
};
const deselectRower = () => {
    activePanel.value = 2;

    rowers.selectedId = null;

    delete params.rower;
};

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
onMounted(async () => {
    const router = useRouter();
    const { event, crew, rower } = router.currentRoute.value.query;

    if (event && typeof event == 'string') await selectEvent(event);
    if (crew && typeof crew == 'string') await selectCrew(crew);
    if (rower && typeof rower == 'string') await selectRower(rower);
});
</script>

<script lang="ts">
export default defineComponent({
    layout: 'main'
});
</script>
