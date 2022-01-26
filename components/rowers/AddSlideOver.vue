<template>
    <EditorSlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="$emit('save', editorData)"
        @cancel="$emit('cancel')"
    >
        <template #header>Create a new member</template>
        <template #subheader>Create a new member for this event.</template>

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

        <!-- Knrb -->
        <div class="col-span-6">
            <label for="knrb" class="form-label required">KNRB</label>
            <input
                id="knrb"
                type="number"
                inputmode="numeric"
                v-model="editorData.knrb"
                autocomplete="off"
                class="form-text"
                required
            />
        </div>

        <!-- Initials -->
        <div class="col-span-6">
            <label for="initials" class="form-label">Initials</label>
            <input
                id="initials"
                type="text"
                v-model="editorData.initials"
                autocomplete="name"
                class="form-text"
            />
        </div>

        <!-- First name -->
        <div class="col-span-6 sm:col-span-3">
            <label for="firstname" class="form-label required"
                >First name</label
            >
            <input
                id="firstname"
                type="text"
                v-model="editorData.firstname"
                autocomplete="given-name"
                class="form-text"
                required
            />
        </div>

        <!-- Middle name -->
        <div class="col-span-6 sm:col-span-3">
            <label for="middlename" class="form-label">Middle name</label>
            <input
                id="middlename"
                type="text"
                v-model="editorData.middlename"
                autocomplete="additional-name"
                class="form-text"
            />
        </div>

        <!-- Last name -->
        <div class="col-span-6">
            <label for="lastname" class="form-label required">Last name</label>
            <input
                id="lastname"
                type="text"
                v-model="editorData.lastname"
                autocomplete="family-name"
                class="form-text"
                required
            />
        </div>

        <!-- Year of Birth -->
        <div class="col-span-6">
            <label for="year_of_birth" class="form-label required">
                Year of Birth
            </label>
            <input
                id="year_of_birth"
                type="number"
                inputmode="numeric"
                v-model="editorData.year_of_birth"
                autocomplete="bday-year"
                class="form-text"
                required
            />
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

        <!-- License -->
        <div class="col-span-6 flex items-start">
            <div class="flex h-5 items-center">
                <input
                    id="license"
                    type="checkbox"
                    v-model="editorData.license"
                    class="form-checkbox"
                    required
                />
            </div>
            <div class="ml-3 text-sm">
                <label for="license" class="form-label required">
                    License
                </label>
                <!-- TODO: get a description -->
                <p class="text-gray-500">This is a description.</p>
            </div>
        </div>

        <!-- Position -->
        <div class="col-span-6">
            <label for="position" class="form-label required">Position</label>
            <input
                id="position"
                type="number"
                inputmode="numeric"
                v-model="editorData.position"
                autocomplete="bday-year"
                class="form-text"
                required
            />
        </div>

        <!-- Role -->
        <div class="col-span-6 sm:col-span-4">
            <label for="role" class="form-label required">Role</label>
            <select
                id="role"
                v-model="editorData.role"
                autocomplete="off"
                class="form-select"
                required
            >
                <option
                    v-for="role in Object.values(RowerRole)"
                    :key="role"
                    :value="role"
                >
                    {{ getRowerRoleLabel(role) }}
                </option>
            </select>
        </div>
    </EditorSlideOver>
</template>

<script lang="ts" setup>
import { useClubStore } from '~~/stores/club';

import {
    Gender,
    NewRower,
    RowerRole,
    getGenderLabel,
    getRowerRoleLabel
} from '~~/types/rower.model';
import { SlideOverState } from '~~/types/slide-over-state.model';

const clubs = useClubStore();

interface Props {
    open: boolean;
    state: SlideOverState;
    data: NewRower;
}

const props = withDefaults(defineProps<Props>(), {
    open: false
});

const emits = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'save', data: NewRower): void;
    (e: 'cancel'): void;
}>();

const editorData: NewRower = reactive({
    ...props.data
});

const setData = (data: NewRower) => {
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
