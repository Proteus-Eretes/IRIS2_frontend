<template>
    <SlidingPanel
        :index="index"
        :activePanel="activePanel"
        @close="$emit('close')"
        @focus="$emit('focus')"
    >
        <template #header>
            {{ events.selectedEvent ? events.selectedEvent.name : '' }}
        </template>

        <template #header-status>
            {{
                events.selectedEvent
                    ? getEventStatusLabel(events.selectedEvent.status)
                    : ''
            }}
        </template>

        <div
            v-if="events.selectedEvent && (!useField || events.selectedField)"
            class="p-2"
        >
            <div
                class="grid w-full grid-cols-2 gap-3 rounded-md border border-gray-200 bg-white p-3 text-xs md:grid-cols-3"
            >
                <div>
                    <h6 class="font-semibold">Event code</h6>
                    <span>{{ events.selectedEvent.code }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Event</h6>
                    <span>{{ events.selectedEvent.name }}</span>
                </div>
            </div>

            <Table
                :title="useField ? 'Teams' : 'Crews'"
                :headers="tableHeaders"
                :items="
                    useField
                        ? crews.allTeamsOfSelectedField
                        : crews.allCrewsOfSelectedEvent
                "
                :activeId="
                    useField ? crews.selectedTeamId : crews.selectedCrewId
                "
                @item-click="
                    useField
                        ? $emit('select-team', $event.id)
                        : $emit('select-crew', $event.id)
                "
            >
                <template #name="{ item }">
                    <span class="text-sm font-semibold">
                        {{ getCrew(item) ? getCrew(item).displayName : 'Team' }}
                    </span>
                </template>

                <template #club-name="{ item }">
                    <span class="text-sm">
                        {{ getCrew(item) ? getCrew(item).clubName : 'Club' }}
                    </span>
                </template>

                <template #rowers-count="{ item }">
                    <div class="flex items-center gap-2">
                        <ph-users-three
                            class="icon text-primary-400"
                            aria-hidden="true"
                        />

                        <!-- FIXME: Rowers niet zo -->
                        <span class="text-xs font-medium">
                            {{
                                getCrew(item) ? getCrew(item).rowers.length : 0
                            }}
                        </span>
                    </div>
                </template>
            </Table>

            <div class="flex w-full justify-center p-2">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="openAddCrew()"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Crew</span>
                </button>
            </div>
        </div>
        <div v-else class="p-3 text-sm font-semibold text-danger-500">
            Nothing
        </div>
    </SlidingPanel>

    <CrewsAddSlideOver
        v-model:open="showAddCrew"
        :event="events.selectedEventId"
        :regatta="regattas.selectedId"
    />
</template>

<script lang="ts" setup>
import { PhUsersThree, PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';
import { useClubStore } from '~~/stores/club';

import { getEventStatusLabel } from '~~/types/event.model';
import { TableHeader } from '~~/types/table-header.model';

const regattas = useRegattaStore();
const events = useEventStore();
const crews = useCrewStore();
const clubs = useClubStore();

const showAddCrew = ref(false);

const openAddCrew = () => {
    showAddCrew.value = true;
    clubs.loadClubs();
};

interface Props {
    index: number;
    activePanel: number;
    useField?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    index: 0,
    activePanel: 0,
    useField: false
});

const emits = defineEmits<{
    (e: 'focus'): void;
    (e: 'close'): void;
    (e: 'select-team', id: string): void;
    (e: 'select-crew', id: string): void;
}>();

const tableHeaders: TableHeader[] = [
    { id: 'Name', sortable: false },
    { id: 'Club name', sortable: false },
    { id: 'Rowers count', sortable: false }
];

const getCrew = (item: any) => {
    const id = props.useField ? item.crew_id : item.id;
    return crews.getCrewById(id);
};
</script>
