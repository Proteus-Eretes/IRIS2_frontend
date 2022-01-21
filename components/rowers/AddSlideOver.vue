<template>
    <EditorSlideOver
        :open="open"
        @update:open="$emit('update:open', $event)"
        @save="rowers.add(addRowerData)"
    >
        <template #header>Create a new member</template>
        <template #subheader>Create a new member for this event.</template>

        <!-- Club -->
        <div class="col-span-6 sm:col-span-4">
            <label for="club" class="form-label">Club</label>
            <select
                id="club"
                v-model="addRowerData.club_id"
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

        <!-- Knrb -->
        <div class="col-span-6">
            <label for="knrb" class="form-label">KNRB</label>
            <input
                id="knrb"
                type="text"
                inputmode="numeric"
                v-model="addRowerData.knrb"
                autocomplete="off"
                class="form-text"
            />
        </div>

        <!-- Initials -->
        <div class="col-span-6">
            <label for="initials" class="form-label">Initials</label>
            <input
                id="initials"
                type="text"
                v-model="addRowerData.initals"
                autocomplete="name"
                class="form-text"
            />
        </div>

        <!-- First name -->
        <div class="col-span-6 sm:col-span-3">
            <label for="firstname" class="form-label">First name</label>
            <input
                id="firstname"
                type="text"
                v-model="addRowerData.firstname"
                autocomplete="given-name"
                class="form-text"
            />
        </div>

        <!-- Middle name -->
        <div class="col-span-6 sm:col-span-3">
            <label for="middlename" class="form-label">Middle name</label>
            <input
                id="middlename"
                type="text"
                v-model="addRowerData.middlename"
                autocomplete="additional-name"
                class="form-text"
            />
        </div>

        <!-- Last name -->
        <div class="col-span-6">
            <label for="lastname" class="form-label">Last name</label>
            <input
                id="lastname"
                type="text"
                v-model="addRowerData.lastname"
                autocomplete="family-name"
                class="form-text"
            />
        </div>

        <!-- Year of Birth -->
        <div class="col-span-6">
            <label for="year_of_birth" class="form-label">Year of Birth</label>
            <input
                id="year_of_birth"
                type="text"
                inputmode="numeric"
                v-model="addRowerData.year_of_birth"
                autocomplete="bday-year"
                class="form-text"
            />
        </div>

        <!-- Gender -->
        <div class="col-span-6 sm:col-span-4">
            <label for="gender" class="form-label">Gender</label>
            <select
                id="gender"
                v-model="addRowerData.gender"
                autocomplete="off"
                class="form-select"
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
        <div class="col-span-6 sm:col-span-4">
            <label for="license" class="form-label">License</label>
            <select
                id="license"
                v-model="addRowerData.license"
                autocomplete="off"
                class="form-select"
            >
                <option :value="true">Yes</option>
                <option :value="false">No</option>
            </select>
        </div>

        <!-- Position -->
        <div class="col-span-6">
            <label for="year_of_birth" class="form-label">Position</label>
            <input
                id="year_of_birth"
                type="text"
                inputmode="numeric"
                v-model="addRowerData.position"
                autocomplete="bday-year"
                class="form-text"
            />
        </div>

        <!-- Role -->
        <div class="col-span-6 sm:col-span-4">
            <label for="role" class="form-label">Role</label>
            <select
                id="role"
                v-model="addRowerData.role"
                autocomplete="off"
                class="form-select"
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
import { useRowerStore } from '~~/stores/rower';
import { useClubStore } from '~~/stores/club';

import {
    Gender,
    NewRower,
    RowerRole,
    getGenderLabel,
    getRowerRoleLabel
} from '~~/types/rower.model';

const rowers = useRowerStore();
const clubs = useClubStore();

const addRowerData: NewRower = reactive({
    crew_id: '',
    regatta_id: '',
    club_id: '',
    knrb: '',
    initals: '',
    firstname: '',
    middlename: '',
    lastname: '',
    year_of_birth: null,
    gender: Gender.MAN,
    license: true,
    position: null,
    role: RowerRole.ROWER
});

interface Props {
    open: boolean;
    role: RowerRole | null;
    crew: string | null;
    regatta: string | null;
    club: string | null;
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

    if (props.role) addRowerData.role = props.role;
    if (props.crew) addRowerData.crew_id = props.crew;
    if (props.regatta) addRowerData.regatta_id = props.regatta;
    if (props.club) addRowerData.club_id = props.club;
});
</script>
