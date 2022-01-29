<template>
    <div class="h-full w-full">
        <div class="sliding-container">
            <SlidingPanel
                :index="0"
                :activePanel="activePanel"
                @focus="activePanel = 0"
            >
                <template #header>Blocks</template>

                <template #default>
                    <!-- FIXME: do the action -->
                    <Table
                        title="Blocks"
                        :headers="tableHeaders"
                        :actions="[
                            'assign',
                            'lots',
                            'shirts',
                            'edit',
                            'delete'
                        ]"
                        :items="blocks.allBlocks"
                        :activeId="blocks.selectedId"
                        @item-click="selectBlock($event.id)"
                        @action="performTableAction($event)"
                        has-headers
                    >
                        <template #block="{ item }">
                            <span class="badge bg-primary-800 text-white">
                                {{ item.block }}
                            </span>
                        </template>

                        <template #start-date="{ item }">
                            <span class="text-sm">
                                {{ formatDate(item.start_time) }}
                            </span>
                        </template>

                        <template #start-time="{ item }">
                            <span class="text-sm">
                                {{ formatTime(item.start_time) }}
                            </span>
                        </template>

                        <template #status="{ item }">
                            <span class="pill bg-primary-400 text-white">
                                {{ getBlockStatusLabel(item.status) }}
                            </span>
                        </template>
                    </Table>

                    <div class="flex w-full justify-center p-2">
                        <button
                            type="button"
                            class="button icon-button button-secondary"
                            @click="addBlock()"
                        >
                            <ph-plus class="icon text-gray-400" />
                            <span>Add Block</span>
                        </button>
                    </div>
                </template>
            </SlidingPanel>

            <BlocksSlidingPanel
                :index="1"
                :activePanel="activePanel"
                @close="deselectBlock()"
                @focus="activePanel = 1"
                @select-field="selectField($event)"
            />

            <EventsSlidingPanel
                :index="2"
                :activePanel="activePanel"
                @close="deselectField()"
                @focus="activePanel = 2"
                @select-team="selectTeam($event)"
                use-field
            />

            <CrewsSlidingPanel
                :index="3"
                :activePanel="activePanel"
                @close="deselectTeam()"
                @focus="activePanel = 3"
                @select-rower="selectRower($event)"
                use-team
            />

            <RowersSlidingPanel
                :index="4"
                :activePanel="activePanel"
                @close="deselectRower()"
                @focus="activePanel = 4"
            />
        </div>

        <BlocksEditorSlideOver
            v-model:open="showBlockEditor"
            :state="blockEditorState"
            :data="blockEditorData"
            @save="saveBlockEditor($event)"
            @cancel="cancelBlockEditor()"
        />
    </div>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useRegattaStore } from '~~/stores/regatta';
import { useBlockStore } from '~~/stores/block';
import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';
import { useRowerStore } from '~~/stores/rower';
import { useClubStore } from '~~/stores/club';

import { Block, getBlockStatusLabel, NewBlock } from '~~/models/block';
import { useDateFormatter } from '~~/composables/useDateFormatter';
import { TableHeader } from '~~/models/table';
import { SlideOverState } from '~~/models/slide-over-state';

const { formatDate, formatTime } = useDateFormatter();

const regattas = useRegattaStore();
const blocks = useBlockStore();
const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();
const rowers = useRowerStore();
const clubs = useClubStore();

await blocks.loadBlocks();

// The panel that is last opened
const activePanel = ref(0);

const tableHeaders: TableHeader[] = [
    { id: 'Block', sortable: false },
    { id: 'Start date', sortable: false },
    { id: 'Start time', sortable: false },
    { id: 'Status', sortable: false }
];

const performTableAction = (action: { action: string; item: Block }) => {
    //FIXME: do the other actions
    console.log(action.action, action.item);
    switch (action.action) {
        case 'assign':
            break;
        case 'lots':
            break;
        case 'shirts':
            break;
        case 'edit':
            editBlock(action.item.id);
            break;
        case 'delete':
            deleteBlock(action.item.id);
            break;
    }
};

const showBlockEditor = ref(false);
const blockEditorState = ref(SlideOverState.ADD);
const initialBlockEditorData: NewBlock = {
    regatta_id: '',
    block: null,
    start_time: new Date()
};

const blockEditorData: NewBlock = reactive({
    ...initialBlockEditorData
});

const resetBlockData = (data: NewBlock = initialBlockEditorData) => {
    Object.assign(blockEditorData, data);
};

const addBlock = async () => {
    resetBlockData();

    await clubs.loadClubs();
    blockEditorData.regatta_id = regattas.selectedId;

    blockEditorState.value = SlideOverState.ADD;
    showBlockEditor.value = true;
};
const editBlock = async (id: string) => {
    await clubs.loadClubs();
    blocks.selectedId = id;

    blockEditorState.value = SlideOverState.EDIT;
    showBlockEditor.value = true;

    const b = blocks.selectedBlock;

    resetBlockData({
        regatta_id: b.regatta_id,
        block: b.block,
        start_time: b.start_time
    });
};
const deleteBlock = (id: string) => {
    const c = window.confirm('Are you sure you want to delete this block?');
    if (c) blocks.delete(id);
};

const saveBlockEditor = (data: NewBlock) => {
    switch (blockEditorState.value) {
        case SlideOverState.ADD:
            blocks.add(data);
            break;
        case SlideOverState.EDIT:
            blocks.edit(blocks.selectedId, data);
            blocks.selectedId = null;
            break;
    }
};
const cancelBlockEditor = () => {
    blocks.selectedId = null;
};

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const selectBlock = async (id: string) => {
    activePanel.value = 1;
    params.block = id;

    blocks.selectedId = id;

    await events.loadFieldsByBlock();
    await rounds.loadRoundsByBlock();

    await events.loadEvents();
};
const selectField = async (id: string) => {
    activePanel.value = 2;
    params.field = id;

    events.selectedFieldId = id;
    events.selectedEventId = events.selectedField
        ? events.selectedField.event_id
        : null;

    await crews.loadTeamsByField();

    await crews.loadCrews();
    // events.loadSelectedEvent();
};
const selectTeam = async (id: string) => {
    activePanel.value = 3;
    params.team = id;

    crews.selectedTeamId = id;
    crews.selectedCrewId = crews.selectedTeam
        ? crews.selectedTeam.crew_id
        : null;

    await rowers.loadRowersByCrew();

    clubs.selectedId = crews.selectedCrew.club_id;
    await clubs.loadSelectedClub();
};
const selectRower = async (id: string) => {
    activePanel.value = 4;
    params.rower = id;

    rowers.selectedId = id;

    await rowers.loadSelectedRower();
};

const deselectBlock = () => {
    activePanel.value = 0;

    blocks.selectedId = null;

    delete params.block;
};
const deselectField = () => {
    activePanel.value = 1;

    events.selectedFieldId = null;
    events.selectedEventId = null;

    delete params.field;
};
const deselectTeam = () => {
    activePanel.value = 2;

    crews.selectedTeamId = null;
    crews.selectedCrewId = null;

    delete params.team;
};
const deselectRower = () => {
    activePanel.value = 3;

    rowers.selectedId = null;

    delete params.rower;
};

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
onMounted(async () => {
    const router = useRouter();
    const { block, field, team, rower } = router.currentRoute.value.query;

    if (block && typeof block == 'string') await selectBlock(block);
    if (field && typeof field == 'string') await selectField(field);
    if (team && typeof team == 'string') await selectTeam(team);
    if (rower && typeof rower == 'string') await selectRower(rower);
});

definePageMeta({
    layout: 'main'
    // title: 'Blocks - IRIS',
});
</script>
