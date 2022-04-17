<template>
    <div class="shrink-0">
        <div
            v-if="type === ToastType.SUCCESS"
            class="rounded-full border-2 border-success-200 p-0.5"
        >
            <ph-check class="h-4 w-4 text-success-400" />
        </div>
        <div
            v-if="type === ToastType.INFO"
            class="rounded-full border-2 border-secondary-200 p-0.5"
        >
            <div
                class="h-4 w-4 items-center text-center text-sm font-semibold leading-4 text-secondary-400"
            >
                i
            </div>
        </div>
        <div
            v-if="type === ToastType.WARNING"
            class="rounded-full border-2 border-warning-200 p-0.5"
        >
            <div
                class="h-4 w-4 items-center text-center text-sm font-semibold leading-4 text-warning-400"
            >
                !
            </div>
        </div>
        <div
            v-if="type === ToastType.DANGER"
            class="rounded-full border-2 border-danger-200 p-0.5"
        >
            <div
                class="h-4 w-4 items-center text-center text-sm font-semibold leading-4 text-danger-400"
            >
                !
            </div>
        </div>
        <div
            v-if="type === ToastType.DENIED"
            class="rounded-full border-2 border-danger-200 p-0.5"
        >
            <ph-x class="h-4 w-4 text-danger-100" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PhX } from 'phosphor-vue';
import { ToastType } from '~~/models/toast';

interface Props {
    type: ToastType;
}

const props = defineProps<Props>();
</script>
