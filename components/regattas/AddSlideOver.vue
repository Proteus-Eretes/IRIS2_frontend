<template>
    <EditorSlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="
            () => {
                regattas.add(addRegattaData);
                resetState();
            }
        "
    >
        <template #header>Create a new regatta</template>
        <template #subheader>Create a new regatta for this regatta.</template>

        <!-- Name -->
        <div class="col-span-6">
            <label for="name" class="form-label required">Name</label>
            <input
                id="name"
                type="text"
                v-model="addRegattaData.name"
                autocomplete="organization"
                class="form-text"
                required
            />
        </div>

        <!-- Breaking news -->
        <div class="col-span-6">
            <label for="breaking_news" class="form-label">Breaking news</label>
            <div class="mt-1">
                <textarea
                    id="breaking_news"
                    v-model="addRegattaData.breaking_news"
                    rows="3"
                    class="form-text"
                />
            </div>
            <!-- TODO: get a description -->
            <p class="mt-2 text-sm text-gray-500">This is a description.</p>
        </div>

        <!-- Start date -->
        <div class="col-span-6">
            <label for="start-date" class="form-label required">
                Start date
            </label>
            <input
                id="start-date"
                type="date"
                v-model="addRegattaData.start_date"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- End date -->
        <div class="col-span-6">
            <label for="end-date" class="form-label required">End date</label>
            <input
                id="end-date"
                type="date"
                v-model="addRegattaData.end_date"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- Correction factor type -->
        <div class="col-span-6 sm:col-span-4">
            <label for="correction_factor_type" class="form-label required">
                Correction factor type
            </label>
            <select
                id="correction_factor_type"
                v-model="addRegattaData.correction_factor_type"
                autocomplete="off"
                class="form-select"
                required
            >
                <!-- TODO: waar krijg ik dit? -->
                <option value="FIXME">FIXME</option>
                <!-- <option
                    v-for="gender in Object.values(Gender)"
                    :key="gender"
                    :value="gender"
                >
                    {{ getGenderLabel(gender) }}
                </option> -->
            </select>
        </div>

        <!-- Race type -->
        <div class="col-span-6 sm:col-span-4">
            <label for="race_type" class="form-label required">Race type</label>
            <select
                id="race_type"
                v-model="addRegattaData.race_type"
                autocomplete="off"
                class="form-select"
                required
            >
                <option
                    v-for="type in Object.values(RegattaType)"
                    :key="type"
                    :value="type"
                >
                    {{ getRegattaTypeLabel(type) }}
                </option>
            </select>
        </div>

        <!-- Venue -->
        <div class="col-span-6 sm:col-span-4">
            <label for="venue" class="form-label required"> Venue </label>
            <select
                id="venue"
                v-model="addRegattaData.venue_id"
                autocomplete="off"
                class="form-select"
                required
            >
                <!-- TODO: waar krijg ik dit? -->
                <option value="FIXME">FIXME</option>
                <!-- <option
                    v-for="gender in Object.values(Gender)"
                    :key="gender"
                    :value="gender"
                >
                    {{ getGenderLabel(gender) }}
                </option> -->
            </select>
        </div>
    </EditorSlideOver>
</template>

<script lang="ts" setup>
import { useRegattaStore } from '~~/stores/regatta';

import {
    NewRegatta,
    RegattaType,
    getRegattaTypeLabel
} from '~~/types/regatta.model';

const regattas = useRegattaStore();

const initialState: NewRegatta = {
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    breaking_news: '',
    correction_factor_type: '',
    race_type: RegattaType.CHASE,
    venue_id: ''
};

const addRegattaData = reactive({
    ...initialState
});

const resetState = () => {
    Object.assign(addRegattaData, initialState);
};

interface Props {
    open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save'): void;
}>();
</script>
