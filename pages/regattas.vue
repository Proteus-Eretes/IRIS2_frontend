<template>
    <div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 p-3">
            <template
                v-for="(regatta, index) in regattas.allRegattas"
                :key="regatta.id"
            >
                <div class="panel group relative bg-white">
                    <div
                        class="absolute hidden group-hover:block top-2 right-2 space-x-1"
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
                        class="flex flex-col justify-center items-center p-3"
                    >
                        <div
                            class="flex justify-center items-center w-24 h-24 bg-primary-100 text-primary-500 rounded-full font-semibold text-3xl mb-3"
                            :title="getRegattaTypeLabel(regatta.race_type)"
                        >
                            <!-- {{ getYear(regatta.start_date) }} -->
                            <ph-arrows-counter-clockwise
                                v-if="regatta.race_type == RegattaType.CHASE"
                                weight="fill"
                                class="w-14 h-14"
                            />
                            <ph-clock-counter-clockwise
                                v-if="
                                    regatta.race_type == RegattaType.ALL_ROUND
                                "
                                weight="fill"
                                class="w-14 h-14"
                            />
                        </div>

                        <span
                            class="text-lg font-semibold leading-7 text-primary-900 sm:text-xl sm:truncate"
                        >
                            {{ regatta.name }}
                        </span>

                        <span
                            class="text-sm text-primary-400 sm:text-md sm:truncate"
                        >
                            {{ formatDate(regatta.start_date, true) }}
                        </span>
                    </router-link>
                </div>
            </template>
        </div>

        <div class="flex flex-col w-full p-2 gap-2 items-center justify-center">
            <TablePagination
                v-if="regattas.allRegattas.length > maxItems"
                v-model:index="paginationIndex"
                :amount="regattas.allRegattas.length"
                :spacing="maxItems"
            />

            <button
                type="button"
                class="button icon-button button-secondary"
                @click="showAddRegatta = true"
            >
                <ph-plus class="icon text-gray-400" />
                <span>Add Regatta</span>
            </button>
        </div>

        <RegattasAddSlideOver v-model:open="showAddRegatta" />
    </div>
</template>

<script lang="ts" setup>
import {
    PhTrash,
    PhArrowsCounterClockwise,
    PhClockCounterClockwise,
    PhPlus
} from 'phosphor-vue';

import { RegattaType, getRegattaTypeLabel } from '~~/types/regatta.model';
import { useRegattaStore } from '~~/stores/regatta';
const regattas = useRegattaStore();

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { getYear, formatDate } = useDateFormatter();

const paginationIndex = ref(1);
const maxItems = ref(10);

const showAddRegatta = ref(false);

const isInRange = (index: number): boolean => {
    return (
        index >= (paginationIndex.value - 1) * maxItems.value &&
        index < (paginationIndex.value - 1) * maxItems.value + maxItems.value
    );
};

const editRegatta = (id: string) => {};
const deleteRegatta = (id: string) => {
    if (confirm('Are you sure you want to delete this regatta?'))
        regattas.delete(id);
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
</script>

<script lang="ts">
export default defineComponent({
    layout: 'main'
});
</script>
