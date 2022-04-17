<template>
    <SlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>
            <span v-if="state == SlideOverState.ADD">Create a new crew</span>
            <span v-else>Edit this crew</span>
        </template>
        <template #subheader>
            <span v-if="state == SlideOverState.ADD">
                Create a new crew for this regatta. Add rowers later.
            </span>
        </template>

        <!-- Event -->
        <div class="col-span-6 sm:col-span-4">
            <label for="event" class="form-label required">Event</label>
            <select
                id="event"
                v-model="editorData.event_id"
                autocomplete="organization"
                class="form-select"
                required
            >
                <option
                    v-for="event in events.allEvents"
                    :key="event.id"
                    :value="event.id"
                >
                    {{ event.code }}
                </option>
            </select>
        </div>

        <!-- Club -->
        <div class="col-span-6 sm:col-span-4">
            <label for="club" class="form-label required">Club</label>
            <select
                id="club"
                v-model="editorData.club_id"
                autocomplete="organization"
                class="form-select"
                required
            >
                <option
                    v-for="club in clubs.allClubs"
                    :key="club.id"
                    :value="club.id"
                >
                    {{ club.name }}
                </option>
            </select>
        </div>

        <!-- Name -->
        <div class="col-span-6">
            <label for="name" class="form-label required">Name</label>
            <input
                id="name"
                type="text"
                v-model="editorData.displayName"
                autocomplete="name"
                class="form-text"
                required
            />
        </div>

        <!-- Shortname -->
        <div class="col-span-6">
            <label for="shortname" class="form-label">Shortname</label>
            <input
                id="shortname"
                type="text"
                v-model="editorData.shortname"
                autocomplete="nickname"
                class="form-text"
            />
        </div>

        <!-- Alternative -->
        <div class="col-span-6">
            <label for="alternative" class="form-label">Alternative</label>
            <input
                id="alternative"
                type="text"
                v-model="editorData.alternative"
                autocomplete="nickname"
                class="form-text"
            />
        </div>

        <!-- Combination -->
        <div class="col-span-6 flex items-start">
            <div class="flex h-5 items-center">
                <input
                    id="combination"
                    type="checkbox"
                    v-model="editorData.combination"
                    class="form-checkbox"
                />
            </div>
            <div class="ml-3 text-sm">
                <label for="combination" class="form-label">
                    Combination
                </label>
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
                    v-for="status in Object.values(CrewStatus)"
                    :key="status"
                    :value="status"
                >
                    {{ getCrewStatusLabel(status) }}
                </option>
            </select>
        </div>
    </SlideOver>
</template>

<script lang="ts" setup>
import { useEventStore } from '~~/stores/event';
import { useClubStore } from '~~/stores/club';

import { CrewStatus, NewCrew, getCrewStatusLabel } from '~~/models/crew';
import { SlideOverState } from '~~/models/slide-over-state';

const events = useEventStore();
const clubs = useClubStore();

interface Props {
    open: boolean;
    state: SlideOverState;
    data: NewCrew;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: NewCrew): void;
    (e: 'cancel'): void;
}>();

const editorData: NewCrew = reactive({
    ...props.data
});

const setData = (data: NewCrew) => {
    Object.assign(editorData, data);
};

watch(
    () => props.open,
    (open, _) => {
        if (!open) return;

        setData(props.data);
    }
);
</script>
