<template>
    <SlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>
            <span v-if="state == SlideOverState.ADD">Create a new event</span>
            <span v-else>Edit this event</span>
        </template>
        <template #subheader>
            <span v-if="state == SlideOverState.ADD">
                Create a new event for this regatta.
            </span>
        </template>

        <!-- Event number -->
        <div class="col-span-6">
            <label for="knrb" class="form-label required">Event number</label>
            <input
                id="knrb"
                type="number"
                inputmode="numeric"
                v-model="editorData.number"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- Date -->
        <div class="col-span-6">
            <label for="date" class="form-label required">Date</label>
            <input
                id="date"
                type="date"
                v-model="day"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- Code -->
        <div class="col-span-6">
            <label for="code" class="form-label required">Code</label>
            <input
                id="code"
                type="text"
                v-model="editorData.code"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

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

        <!-- Category -->
        <div class="col-span-6">
            <label for="category" class="form-label">Category</label>
            <input
                id="category"
                type="text"
                v-model="editorData.category"
                autocomplete="off"
                class="form-text"
            />
        </div>

        <!-- Boat type -->
        <div class="col-span-6">
            <label for="boat_type" class="form-label required">Boat type</label>
            <input
                id="boat_type"
                type="text"
                v-model="editorData.boat_type"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- Weighed -->
        <div class="col-span-6 flex items-start">
            <div class="flex h-5 items-center">
                <input
                    id="weighed"
                    type="checkbox"
                    v-model="editorData.weighed"
                    class="form-checkbox"
                />
            </div>
            <div class="ml-3 text-sm">
                <label for="weighed" class="form-label">Weighed</label>
                <!-- TODO: get a description -->
                <p class="text-gray-500">This is a description.</p>
            </div>
        </div>

        <!-- Remarks -->
        <div class="col-span-6">
            <label for="remarks" class="form-label">Remarks</label>
            <div class="mt-1">
                <textarea
                    id="remarks"
                    v-model="editorData.remarks"
                    rows="3"
                    class="form-text"
                />
            </div>
            <!-- TODO: get a description -->
            <p class="mt-2 text-sm text-gray-500">This is a description.</p>
        </div>

        <!-- Gender -->
        <div class="col-span-6 sm:col-span-4">
            <label for="gender" class="form-label required">Gender</label>
            <select
                id="gender"
                v-model="editorData.gender"
                autocomplete="off"
                class="form-select"
                required
            >
                <option
                    v-for="gender in Object.values(Gender)"
                    :key="gender"
                    :value="gender"
                >
                    {{ getGenderLabel(gender) }}
                </option>
            </select>
        </div>

        <!-- Cost -->
        <div class="col-span-6 sm:col-span-4">
            <!-- FIXME: costs opvragen? -->
            <label for="cost" class="form-label required">Cost</label>
            <select id="cost" autocomplete="off" class="form-select" required>
                <option value="11e9-6506-9d4929bc-8a27-525400d1387d">
                    (€&nbsp;0,00)
                </option>
                <option value="11e9-7261-0196f1f8-9ad2-525400d1387d">
                    NSRF (€&nbsp;0,00)
                </option>
                <option value="11e9-7261-0197d014-8cba-525400d1387d">
                    skiff (€&nbsp;22,00)
                </option>
                <option value="11e9-7261-0198a746-90f9-525400d1387d">
                    twee (€&nbsp;27,00)
                </option>
                <option value="11e9-7261-01996d0c-b261-525400d1387d">
                    vier (€&nbsp;44,00)
                </option>
                <option value="11e9-7261-019a27f6-b4cd-525400d1387d">
                    acht (€&nbsp;70,00)
                </option>
                <option value="11e9-7261-019b1526-b784-525400d1387d">
                    bedrijfsacht (€&nbsp;140,00)
                </option>
            </select>
        </div>

        <!-- Status -->
        <div class="col-span-6 sm:col-span-4">
            <label for="status" class="form-label">Status</label>
            <select
                id="status"
                v-model="editorData.status"
                autocomplete="off"
                class="form-select"
            >
                <option
                    v-for="status in Object.values(EventStatus)"
                    :key="status"
                    :value="status"
                >
                    {{ getEventStatusLabel(status) }}
                </option>
            </select>
        </div>
    </SlideOver>
</template>

<script lang="ts" setup>
import { EventStatus, NewEvent, getEventStatusLabel } from '~~/models/event';
import { Gender, getGenderLabel } from '~~/models/rower';
import { SlideOverState } from '~~/models/slide-over-state';

import { useDateFormatter } from '~~/composables/useDateFormatter';
const { formatInputDate, getInputDate } = useDateFormatter();

interface Props {
    open: boolean;
    state: SlideOverState;
    data: NewEvent;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: NewEvent): void;
    (e: 'cancel'): void;
}>();

const editorData: NewEvent = reactive({
    ...props.data
});

const setData = (data: NewEvent) => {
    Object.assign(editorData, data);
};

watch(
    () => props.open,
    (open, _) => {
        if (!open) return;

        setData(props.data);
    }
);

const day = computed({
    get() {
        return formatInputDate(editorData.day);
    },
    set(value: string) {
        editorData.day = getInputDate(value);
    }
});
</script>
