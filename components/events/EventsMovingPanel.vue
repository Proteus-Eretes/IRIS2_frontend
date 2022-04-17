<template>
    <MovingPanel
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
                    useField ? crews.allTeamsByField() : crews.allCrewsByEvent()
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

                        <span class="text-xs font-medium">
                            {{
                                rowers.allRowersByCrew(getCrewId(item))
                                    ? rowers.allRowersByCrew(getCrewId(item))
                                          .length
                                    : 0
                            }}
                        </span>
                    </div>
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
        <div v-else class="p-3 text-sm font-semibold text-danger-500">
            Nothing
        </div>
    </MovingPanel>

    <CrewsSlideOver
        v-model:open="showCrewEditor"
        :state="SlideOverState.ADD"
        :data="crewEditorData"
        @save="saveCrewEditor($event)"
    />
</template>

<script lang="ts" setup>
import { PhUsersThree, PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';
import { useClubStore } from '~~/stores/club';
import { useRowerStore } from '~~/stores/rower';

import { getEventStatusLabel } from '~~/models/event';
import { TableHeader } from '~~/models/table';
import { SlideOverState } from '~~/models/slide-over-state';
import { CrewStatus, NewCrew, NewTeam } from '~~/models/crew';

const regattas = useRegattaStore();
const events = useEventStore();
const crews = useCrewStore();
const clubs = useClubStore();
const rowers = useRowerStore();

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

const showCrewEditor = ref(false);
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
    crewEditorData.event_id = events.selectedEventId;
    crewEditorData.regatta_id = regattas.selectedId;

    showCrewEditor.value = true;
};

const saveCrewEditor = async (data: NewCrew) => {
    const newCrewId = await crews.addCrew(data);

    if (props.useField) {
        const newTeam: NewTeam = {
            crew_id: newCrewId,
            regatta_id: regattas.selectedId,
            field_id: events.selectedFieldId
        };
        crews.addTeam(newTeam);
    }
};

const getCrew = (item: any) => {
    const id = props.useField ? item.crew_id : item.id;
    return crews.getCrewById(id);
};
const getCrewId = (item: any) => {
    const id = props.useField ? item.crew_id : item.id;
    return id;
};
</script>
