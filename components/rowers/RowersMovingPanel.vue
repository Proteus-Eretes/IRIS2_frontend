<template>
    <MovingPanel
        :index="index"
        :activePanel="activePanel"
        @close="$emit('close')"
        @focus="$emit('focus')"
    >
        <template #header>
            {{ rowers.selectedRower ? rowers.selectedRower.fullName : '' }}
        </template>

        <div v-if="rowers.selectedRowerDetail" class="p-2">
            <div
                class="grid w-full grid-cols-3 gap-3 rounded-md border border-gray-200 bg-white p-3 text-xs"
            >
                <div>
                    <h6 class="font-semibold">First name</h6>
                    <span>
                        {{ rowers.selectedRowerDetail.firstname }}
                        {{ rowers.selectedRowerDetail.middlename }}
                    </span>
                </div>
                <div>
                    <h6 class="font-semibold">Last name</h6>
                    <span>{{ rowers.selectedRowerDetail.lastname }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Gender</h6>
                    <span>
                        {{ getGenderLabel(rowers.selectedRowerDetail.gender) }}
                    </span>
                </div>
                <div>
                    <h6 class="font-semibold">Year of birth</h6>
                    <span>
                        {{ rowers.selectedRowerDetail.year_of_birth }}
                    </span>
                </div>
                <div></div>
                <div></div>
                <div>
                    <h6 class="font-semibold">Role</h6>
                    <span>
                        {{ getRowerRoleLabel(rowers.selectedRowerDetail.role) }}
                    </span>
                </div>
                <div>
                    <h6 class="font-semibold">KNRB</h6>
                    <span>
                        {{ rowers.selectedRowerDetail.knrb }}
                    </span>
                </div>
                <div>
                    <h6 class="font-semibold">KNRB number</h6>
                    <span>
                        {{ rowers.selectedRowerDetail.knrb_num }}
                    </span>
                </div>
            </div>
        </div>
        <div v-else-if="rowers.selectedRower" class="p-2">
            <div
                class="grid w-full grid-cols-3 gap-3 rounded-md border border-gray-200 bg-white p-3 text-xs"
            >
                <div>
                    <h6 class="font-semibold">Full name</h6>
                    <span>{{ rowers.selectedRower.fullName }}</span>
                </div>
                <div>
                    <h6 class="font-semibold">Gender</h6>
                    <span>
                        {{ getGenderLabel(rowers.selectedRower.gender) }}
                    </span>
                </div>
                <div>
                    <h6 class="font-semibold">Role</h6>
                    <span>
                        {{ getRowerRoleLabel(rowers.selectedRower.role) }}
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="p-3 text-sm font-semibold text-danger-500">
            Nothing
        </div>
    </MovingPanel>
</template>

<script lang="ts" setup>
import { useRowerStore } from '~~/stores/rower';

import { getGenderLabel, getRowerRoleLabel } from '~~/models/rower';

const rowers = useRowerStore();

interface Props {
    index: number;
    activePanel: number;
}

const props = withDefaults(defineProps<Props>(), {
    index: 0,
    activePanel: 0
});

const emits = defineEmits<{
    (e: 'focus'): void;
    (e: 'close'): void;
}>();
</script>
