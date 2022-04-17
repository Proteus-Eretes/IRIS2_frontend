<template>
    <MovingPanel
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
                class="grid w-full grid-cols-2 gap-3 rounded-md border border-gray-200 bg-white p-3 text-xs md:grid-cols-3"
            >
                <div>
                    <h6 class="font-semibold">Shirt number(s)</h6>
                    <span>{{ crews.shirtNumbersByCrew().join(', ') }}</span>
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
                        rowers.strokeByCrew()
                            ? rowers.strokeByCrew().fullName
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
                :actions="['edit', 'delete']"
                :items="rowers.allRowersByCrew()"
                :activeId="rowers.selectedId"
                @item-click="$emit('select-rower', $event.id)"
                @action="performTableAction($event)"
            >
                <template #position="{ item }">
                    <span class="badge bg-primary-800 text-white">
                        {{ item.position }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm">
                        {{ item.fullName }}
                    </span>
                </template>

                <template #gender="{ item }">
                    <span class="pill bg-primary-400 text-white">
                        {{ item.gender }}
                    </span>
                </template>
            </Table>

            <div class="flex w-full justify-center p-2">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="addRower(RowerRole.ROWER)"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Rower</span>
                </button>
            </div>

            <Table
                title="Coaches"
                :headers="tableHeaders"
                :actions="['edit', 'delete']"
                :items="rowers.allCoachesByCrew()"
                :activeId="rowers.selectedId"
                @item-click="$emit('select-rower', $event.id)"
                @action="performTableAction($event)"
            >
                <template #position="{ item }">
                    <span class="badge bg-primary-800 text-white">
                        {{ item.position }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm">
                        {{ item.fullName }}
                    </span>
                </template>

                <template #gender="{ item }">
                    <span class="pill bg-primary-400 text-white">
                        {{ item.gender }}
                    </span>
                </template>
            </Table>

            <div class="flex w-full justify-center p-2">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="addRower(RowerRole.COACH)"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Coach</span>
                </button>
            </div>

            <Table
                title="Coxes"
                :headers="tableHeaders"
                :actions="['edit', 'delete']"
                :items="rowers.allCoxesByCrew()"
                :activeId="rowers.selectedId"
                @item-click="$emit('select-rower', $event.id)"
                @action="performTableAction($event)"
            >
                <template #position="{ item }">
                    <span class="badge bg-primary-800 text-white">
                        {{ item.position }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm">
                        {{ item.fullName }}
                    </span>
                </template>

                <template #gender="{ item }">
                    <span class="pill bg-primary-400 text-white">
                        {{ item.gender }}
                    </span>
                </template>
            </Table>

            <div class="flex w-full justify-center p-2">
                <button
                    type="button"
                    class="button icon-button button-secondary"
                    @click="addRower(RowerRole.COX)"
                >
                    <ph-plus class="icon text-gray-400" />
                    <span>Add Cox</span>
                </button>
            </div>

            <Table
                title="Fines"
                error-message="This crew didn't receive any fines"
                :headers="finesTableHeader"
                :actions="['edit', 'delete']"
                :items="crews.allFinesByCrew()"
                @action="performFineTableAction($event)"
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

            <!-- FIXME: Add fine -->
            <div class="flex w-full justify-center p-2">
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
    </MovingPanel>

    <RowersSlideOver
        v-model:open="showRowerEditor"
        :state="rowerEditorState"
        :data="rowerEditorData"
        @save="saveRowerEditor($event)"
        @cancel="cancelRowerEditor()"
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
    Fine,
    getCrewStatusLabel,
    getTeamResultStatusLabel
} from '~~/models/crew';
import { Gender, NewRower, Rower, RowerRole } from '~~/models/rower';
import { TableHeader } from '~~/models/table';
import { SlideOverState } from '~~/models/slide-over-state';

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatDate } = useDateFormatter();

const regattas = useRegattaStore();
const events = useEventStore();
const crews = useCrewStore();
const clubs = useClubStore();
const rowers = useRowerStore();

const tableHeaders: TableHeader[] = [
    { id: 'Position', sortable: false },
    { id: 'Name', sortable: false },
    { id: 'Gender', sortable: false }
];
const finesTableHeader: TableHeader[] = [
    { id: 'Amount', sortable: false },
    { id: 'Date', sortable: false }
];

const performTableAction = (action: { action: string; item: Rower }) => {
    switch (action.action) {
        case 'edit':
            editRower(action.item.id);
            break;
        case 'delete':
            deleteRower(action.item.id);
            break;
    }
};
const performFineTableAction = (action: { action: string; item: Fine }) => {
    //FIXME: do the other actions
    console.log(action.action, action.item);
    switch (action.action) {
        case 'edit':
            break;
        case 'delete':
            deleteFine(action.item.id);
            break;
    }
};

const showRowerEditor = ref(false);
const rowerEditorState = ref(SlideOverState.ADD);
const initialRowerEditorData: NewRower = {
    crew_id: '',
    regatta_id: '',
    club_id: '',
    knrb: '',
    initials: '',
    firstname: '',
    middlename: '',
    lastname: '',
    year_of_birth: null,
    gender: Gender.MAN,
    license: true,
    position: null,
    role: RowerRole.ROWER
};

const rowerEditorData: NewRower = reactive({
    ...initialRowerEditorData
});

const resetRowerData = (data: NewRower = initialRowerEditorData) => {
    Object.assign(rowerEditorData, data);
};

const addRower = async (role: RowerRole) => {
    resetRowerData();

    await clubs.loadClubs();
    rowerEditorData.role = role;
    rowerEditorData.crew_id = crews.selectedCrewId;
    rowerEditorData.regatta_id = regattas.selectedId;
    rowerEditorData.club_id = crews.selectedCrew
        ? crews.selectedCrew.club_id
        : null;

    rowerEditorState.value = SlideOverState.ADD;
    showRowerEditor.value = true;
};
const editRower = async (id: string) => {
    await clubs.loadClubs();
    rowers.selectedId = id;

    await rowers.loadSelectedRower();

    rowerEditorState.value = SlideOverState.EDIT;
    showRowerEditor.value = true;

    const r = rowers.selectedRower;
    const rD = rowers.selectedRowerDetail;

    resetRowerData({
        crew_id: r.crew_id,
        regatta_id: r.regatta_id,
        club_id: r.club_id,
        knrb: r.knrb,
        initials: rD.initials,
        firstname: rD.firstname,
        middlename: rD.middlename,
        lastname: rD.lastname,
        year_of_birth: rD.year_of_birth,
        gender: r.gender,
        license: rD.license,
        position: r.position,
        role: r.role
    });
};
const deleteRower = (id: string) => {
    const c = window.confirm('Are you sure you want to delete this rower?');
    if (c) rowers.delete(id);
};
const deleteFine = (id: string) => {
    const c = window.confirm('Are you sure you want to delete this fine?');
    if (c) crews.deleteFine(id);
};

const saveRowerEditor = (data: NewRower) => {
    switch (rowerEditorState.value) {
        case SlideOverState.ADD:
            rowers.add(data);
            break;
        case SlideOverState.EDIT:
            rowers.edit(rowers.selectedId, data);
            rowers.selectedId = null;
            break;
    }
};
const cancelRowerEditor = () => {
    rowers.selectedId = null;
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
</script>
