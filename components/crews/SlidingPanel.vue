<template>
    <SlidingPanel
        :index="index"
        :activePanel="activePanel"
        @close="$emit('close')"
        @focus="$emit('focus')"
    >
        <template #header>
            {{ crews.selectedCrew ? crews.selectedCrew.displayName : '' }}
        </template>

        <!-- TODO: Is dit wat hier moet staan? -->
        <template #header-status>
            <span v-if="useTeam && crews.selectedTeam">
                {{ getTeamResultStatusLabel(crews.selectedTeam.result_status) }}
            </span>

            <span v-else-if="crews.selectedCrew">
                {{ getCrewStatusLabel(crews.selectedCrew.status) }}
            </span>
        </template>

        <div v-if="crews.selectedCrew" class="p-2">
            <div
                class="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-white border border-gray-200 rounded-md w-full text-xs"
            >
                <div>
                    <h6 class="font-semibold">Shirt number(s)</h6>
                    <span>{{
                        crews.shirtNumbersOfSelectedCrew.join(', ')
                    }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Crew name</h6>
                    <span>{{ crews.selectedCrew.displayName }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">KNRB number</h6>
                    <span>{{ crews.selectedCrew.knrb_num }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Club</h6>
                    <span>{{
                        clubs.selectedClubDetail
                            ? clubs.selectedClubDetail.name
                            : ''
                    }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Stroke</h6>
                    <span>{{
                        rowers.strokeOfSelectedCrew
                            ? rowers.strokeOfSelectedCrew.fullName
                            : 'Nothing'
                    }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Category</h6>
                    <span>{{
                        crews.selectedCrew.category
                            ? crews.selectedCrew.category
                            : '-'
                    }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Event code</h6>
                    <span>{{
                        events.selectedEvent
                            ? events.selectedEvent.code
                            : 'Nothing'
                    }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Event</h6>
                    <span>{{
                        events.selectedEvent
                            ? events.selectedEvent.event
                            : 'Nothing'
                    }}</span>
                </div>
            </div>

            <Table
                title="Rowers"
                :headers="tableHeaders"
                :actions="['delete']"
                :items="rowers.allRowersOfSelectedCrew"
                :activeId="rowers.selectedId"
                @item-click="$emit('select-rower', $event.id)"
            >
                <template #position="{ item }">
                    <span class="badge text-white bg-primary-800">
                        {{ item.position }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm">
                        {{ item.fullName }}
                    </span>
                </template>

                <template #gender="{ item }">
                    <span class="pill text-white bg-primary-400">
                        {{ item.gender }}
                    </span>
                </template>
            </Table>

            <div class="w-full p-2 flex justify-center">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="openAddRower(RowerRole.ROWER)"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Rower</span>
                </button>
            </div>

            <Table
                title="Coaches"
                :headers="tableHeaders"
                :actions="['delete']"
                :items="rowers.allCoachesOfSelectedCrew"
                :activeId="rowers.selectedId"
                @item-click="$emit('select-rower', $event.id)"
            >
                <template #position="{ item }">
                    <span class="badge text-white bg-primary-800">
                        {{ item.position }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm">
                        {{ item.fullName }}
                    </span>
                </template>

                <template #gender="{ item }">
                    <span class="pill text-white bg-primary-400">
                        {{ item.gender }}
                    </span>
                </template>
            </Table>

            <div class="w-full p-2 flex justify-center">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="openAddRower(RowerRole.COACH)"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Coach</span>
                </button>
            </div>

            <Table
                title="Coxes"
                :headers="tableHeaders"
                :actions="['delete']"
                :items="rowers.allCoxesOfSelectedCrew"
                :activeId="rowers.selectedId"
                @item-click="$emit('select-rower', $event.id)"
            >
                <template #position="{ item }">
                    <span class="badge text-white bg-primary-800">
                        {{ item.position }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm">
                        {{ item.fullName }}
                    </span>
                </template>

                <template #gender="{ item }">
                    <span class="pill text-white bg-primary-400">
                        {{ item.gender }}
                    </span>
                </template>
            </Table>

            <div class="w-full p-2 flex justify-center">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="openAddRower(RowerRole.COX)"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Cox</span>
                </button>
            </div>

            <Table
                title="Fines"
                error-message="This crew didn't receive any fines"
                :headers="finesTableHeader"
                :items="crews.allFinesOfSelectedCrew"
            >
                <template #amount="{ item }">
                    <span class="text-sm font-semibold">
                        € {{ item.amount }}
                    </span>
                </template>

                <template #date="{ item }">
                    <span class="text-sm">
                        {{ formatDate(item.date, true) }}
                    </span>
                </template>
            </Table>

            <div class="w-full p-2 flex justify-center">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click=""
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Fine</span>
                </button>
            </div>
        </div>
        <div v-else class="p-3 text-sm font-semibold text-danger-500">
            Nothing
        </div>
    </SlidingPanel>

    <RowersAddSlideOver
        v-model:open="showAddRower"
        :role="addRowerRole"
        :crew="crews.selectedCrewId"
        :regatta="regattas.selectedId"
        :club="crews.selectedCrew ? crews.selectedCrew.club_id : null"
    />
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';
import { useClubStore } from '~~/stores/club';
import { useRowerStore } from '~~/stores/rower';

import {
    getCrewStatusLabel,
    getTeamResultStatusLabel
} from '~~/types/crew.model';
import { RowerRole } from '~~/types/rower.model';
import { TableHeader } from '~~/types/table-header.model';

import { useDateFormatter } from '~~/composables/useDateFormatter';

const { formatDate } = useDateFormatter();

const regattas = useRegattaStore();
const events = useEventStore();
const crews = useCrewStore();
const clubs = useClubStore();
const rowers = useRowerStore();

const showAddRower = ref(false);
const addRowerRole = ref(null);

const openAddRower = (role: RowerRole) => {
    showAddRower.value = true;
    clubs.loadClubs();

    addRowerRole.value = role;
};

interface Props {
    index: number;
    activePanel: number;
    useTeam?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    index: 0,
    activePanel: 0,
    useTeam: false
});

const emits = defineEmits<{
    (e: 'focus'): void;
    (e: 'close'): void;
    (e: 'select-rower', id: string): void;
}>();

const tableHeaders: TableHeader[] = [
    { id: 'Position', sortable: false },
    { id: 'Name', sortable: false },
    { id: 'Gender', sortable: false }
];
const finesTableHeader: TableHeader[] = [
    { id: 'Amount', sortable: false },
    { id: 'Date', sortable: false }
];
</script>
