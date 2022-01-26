<template>
    <EditorSlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>
            <span v-if="state == SlideOverState.ADD">
                Create a new regatta
            </span>
            <span v-else>Edit this regatta</span>
        </template>

        <!-- Name -->
        <div class="col-span-6">
            <label for="name" class="form-label required">Name</label>
            <input
                id="name"
                type="text"
                v-model="editorData.name"
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
                    v-model="editorData.breaking_news"
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
                v-model="start_date"
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
                v-model="end_date"
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
                v-model="editorData.correction_factor_type"
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
                v-model="editorData.race_type"
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
                v-model="editorData.venue_id"
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

        <!-- TODO: dingen voor rounds -->
    </EditorSlideOver>
</template>

<script lang="ts" setup>
import {
    NewRegatta,
    RegattaType,
    getRegattaTypeLabel
} from '~~/types/regatta.model';
import { SlideOverState } from '~~/types/slide-over-state.model';

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatInputDate, getInputDate } = useDateFormatter();

interface Props {
    open: boolean;
    state: SlideOverState;
    data: NewRegatta;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: NewRegatta): void;
    (e: 'cancel'): void;
}>();

const editorData: NewRegatta = reactive({
    ...props.data
});

const setData = (data: NewRegatta) => {
    Object.assign(editorData, data);
};

watch(
    () => props.open,
    (open, _) => {
        if (!open) return;

        setData(props.data);
    }
);

const start_date = computed({
    get() {
        return formatInputDate(editorData.start_date);
    },
    set(value: string) {
        editorData.start_date = getInputDate(value);
    }
});
const end_date = computed({
    get() {
        return formatInputDate(editorData.end_date);
    },
    set(value: string) {
        editorData.end_date = getInputDate(value);
    }
});
</script>
