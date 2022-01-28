<template>
    <div>
        <div class="grid grid-cols-2 gap-3 p-3 md:grid-cols-3">
            <template
                v-for="(regatta, index) in regattas.allRegattas"
                :key="regatta.id"
            >
                <div class="panel group relative bg-white">
                    <div
                        class="absolute top-2 right-2 hidden space-x-1 group-hover:block"
                    >
                        <button
                            type="button"
                            @click="editRegatta(regatta.id)"
                            title="Edit regatta"
                        >
                            <ph-pencil class="icon text-gray-500" />
                        </button>

                        <button
                            type="button"
                            @click="deleteRegatta(regatta.id)"
                            title="Delete regatta"
                        >
                            <ph-trash class="icon text-danger-500" />
                        </button>
                    </div>

                    <router-link
                        v-if="isInRange(index)"
                        :to="{ path: '/', query: { regatta: regatta.id } }"
                        @click="selectRegatta(regatta.id)"
                        class="flex flex-col items-center justify-center p-3"
                    >
                        <div
                            class="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-3xl font-semibold text-primary-500"
                            :title="getRegattaTypeLabel(regatta.race_type)"
                        >
                            <!-- {{ getYear(regatta.start_date) }} -->
                            <ph-arrows-counter-clockwise
                                v-if="regatta.race_type == RegattaType.CHASE"
                                weight="fill"
                                class="h-14 w-14"
                            />
                            <ph-clock-counter-clockwise
                                v-if="
                                    regatta.race_type == RegattaType.ALL_ROUND
                                "
                                weight="fill"
                                class="h-14 w-14"
                            />
                        </div>

                        <span
                            class="text-lg font-semibold leading-7 text-primary-900 sm:truncate sm:text-xl"
                        >
                            {{ regatta.name }}
                        </span>

                        <span
                            class="sm:text-md text-sm text-primary-400 sm:truncate"
                        >
                            {{ formatDate(regatta.start_date, true) }}
                        </span>
                    </router-link>
                </div>
            </template>
        </div>

        <div class="flex w-full flex-col items-center justify-center gap-2 p-2">
            <TablePagination
                v-if="regattas.allRegattas.length > maxItems"
                v-model:index="paginationIndex"
                :amount="regattas.allRegattas.length"
                :spacing="maxItems"
            />

            <button
                type="button"
                class="button icon-button button-secondary"
                @click="addRegatta()"
            >
                <ph-plus class="icon text-gray-400" />
                <span>Add Regatta</span>
            </button>
        </div>

        <RegattasEditorSlideOver
            v-model:open="showEditor"
            :state="editorState"
            :data="editorData"
            @save="saveRegattaEditor($event)"
            @cancel="cancelRegattaEditor()"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    PhPencil,
    PhTrash,
    PhArrowsCounterClockwise,
    PhClockCounterClockwise,
    PhPlus
} from 'phosphor-vue';

import {
    RegattaType,
    getRegattaTypeLabel,
    NewRegatta
} from '~~/models/regatta';
import { useRegattaStore } from '~~/stores/regatta';

import { SlideOverState } from '~~/models/slide-over-state';
import { useDateFormatter } from '~~/composables/useDateFormatter';

const { getYear, formatDate } = useDateFormatter();
const regattas = useRegattaStore();

const paginationIndex = ref(1);
const maxItems = ref(10);

const isInRange = (index: number): boolean => {
    return (
        index >= (paginationIndex.value - 1) * maxItems.value &&
        index < (paginationIndex.value - 1) * maxItems.value + maxItems.value
    );
};

const showEditor = ref(false);
const editorState = ref(SlideOverState.ADD);
const initialEditorData: NewRegatta = {
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    breaking_news: '',
    correction_factor_type: '',
    race_type: RegattaType.CHASE,
    venue_id: ''
};

const editorData: NewRegatta = reactive({
    ...initialEditorData
});

const resetData = (data: NewRegatta = initialEditorData) => {
    Object.assign(editorData, data);
};

const addRegatta = () => {
    resetData();

    editorState.value = SlideOverState.ADD;
    showEditor.value = true;
};
const editRegatta = async (id: string) => {
    regattas.selectedId = id;

    await regattas.loadSelectedRegatta();

    editorState.value = SlideOverState.EDIT;
    showEditor.value = true;

    const r = regattas.selectedRegatta;
    const rD = regattas.selectedRegattaDetail;

    resetData({
        name: r.name,
        start_date: r.start_date,
        end_date: r.end_date,
        breaking_news: r.breaking_news,
        correction_factor_type: rD ? rD.correction_factor_type : '',
        race_type: r.race_type,
        venue_id: r.venue_id
    });
};
const deleteRegatta = (id: string) => {
    if (confirm('Are you sure you want to delete this regatta?'))
        regattas.delete(id);
};

const saveRegattaEditor = (data: NewRegatta) => {
    switch (editorState.value) {
        case SlideOverState.ADD:
            regattas.add(data);
            break;
        case SlideOverState.EDIT:
            regattas.edit(regattas.selectedId, data);
            regattas.selectedId = null;
            break;
    }
};
const cancelRegattaEditor = () => {
    regattas.selectedId = null;
};

const params = useUrlSearchParams('history');
const { regatta } = params;
if (regatta && typeof regatta == 'string') {
    regattas.selectedId = null;

    delete params.regatta;
}

const selectRegatta = (id: string) => {
    regattas.selectedId = id;
};

definePageMeta({
    layout: 'main'
});
</script>
