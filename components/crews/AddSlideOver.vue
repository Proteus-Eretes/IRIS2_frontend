<template>
    <EditorSlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="crews.addCrew(addCrewData)"
    >
        <template #header>Create a new crew</template>
        <template #subheader>
            Create a new crew for this regatta. Add rowers later.
        </template>

        <!-- Event -->
        <div class="col-span-6 sm:col-span-4">
            <label for="event" class="form-label">Event</label>
            <select
                id="event"
                v-model="addCrewData.event_id"
                autocomplete="organization"
                class="form-select"
            >
                <option
                    v-for="event in events.allEvents"
                    :key="event.id"
                    :value="event.id"
                >
                    {{ event.name }}
                </option>
            </select>
        </div>

        <!-- Club -->
        <div class="col-span-6 sm:col-span-4">
            <label for="club" class="form-label">Club</label>
            <select
                id="club"
                v-model="addCrewData.club_id"
                autocomplete="organization"
                class="form-select"
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
            <label for="name" class="form-label">Name</label>
            <input
                id="name"
                type="text"
                v-model="addCrewData.displayName"
                autocomplete="name"
                class="form-text"
            />
        </div>

        <!-- Shortname -->
        <div class="col-span-6">
            <label for="shortname" class="form-label">Shortname</label>
            <input
                id="shortname"
                type="text"
                v-model="addCrewData.shortname"
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
                v-model="addCrewData.alternative"
                autocomplete="nickname"
                class="form-text"
            />
        </div>

        <!-- Combination -->
        <div class="col-span-6 flex items-start">
            <div class="flex items-center h-5">
                <input
                    id="combination"
                    type="checkbox"
                    v-model="addCrewData.combination"
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
                    v-model="addCrewData.remarks"
                    rows="3"
                    class="form-text"
                />
            </div>
            <!-- TODO: get a description -->
            <p class="mt-2 text-sm text-gray-500">This is a description.</p>
        </div>
    </EditorSlideOver>
</template>

<script lang="ts" setup>
import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useClubStore } from '~~/stores/club';

import { NewCrew } from '~~/types/crew.model';

const crews = useCrewStore();
const events = useEventStore();
const clubs = useClubStore();

const addCrewData: NewCrew = reactive({
    event_id: '',
    club_id: '',
    regatta_id: '',
    displayName: '',
    shortname: '',
    alternative: '',
    combination: false,
    remarks: ''
});

interface Props {
    open: boolean;
    event: string | null;
    regatta: string | null;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save'): void;
}>();

watchEffect(() => {
    if (!props.open) return;

    if (props.event) addCrewData.event_id = props.event;
    if (props.regatta) addCrewData.regatta_id = props.regatta;
});
</script>
