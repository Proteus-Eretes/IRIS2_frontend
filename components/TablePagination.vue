<template>
    <nav
        class="relative z-0 inline-flex rounded-md -space-x-px"
        aria-label="Pagination"
    >
        <button
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:text-gray-300 hover:bg-gray-50"
            @click="$emit('update:index', index - 1)"
            :disabled="index == min"
        >
            <span class="sr-only">Previous</span>
            <ph-caret-left class="icon" aria-hidden="true" />
        </button>
        <span
            v-if="isTooWide && index - 1 > min"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
        >
            ...
        </span>
        <button
            v-for="i in safeRange"
            :key="i"
            aria-current="page"
            :class="[
                i == index
                    ? 'z-10 bg-secondary-50 border-secondary-500 text-secondary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            ]"
            @click="$emit('update:index', i)"
        >
            {{ i }}
        </button>
        <span
            v-if="isTooWide && index + 1 < max"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
        >
            ...
        </span>
        <button
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:text-gray-300 hover:bg-gray-50"
            @click="$emit('update:index', index + 1)"
            :disabled="index == max"
        >
            <span class="sr-only">Next</span>
            <ph-caret-right class="icon" aria-hidden="true" />
        </button>
    </nav>
</template>

<script lang="ts" setup>
import { PhCaretLeft, PhCaretRight } from 'phosphor-vue';

interface Props {
    index: number;
    amount: number;
    spacing: number;
    showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    index: 1,
    showText: false
});

const emits = defineEmits<{
    (e: 'update:index', index: number): void;
}>();

const min = 1;
const max = computed(() => {
    return Math.ceil(props.amount / props.spacing);
});

const isTooWide = computed(() => {
    return max.value > 5;
});
const safeRange = computed(() => {
    return max.value > 5
        ? range(3, Math.max(1, Math.min(max.value - 2, props.index - 1)))
        : range(max.value, min);
});

const range = (size: number, startAt: number = 0): ReadonlyArray<number> => {
    return [...Array(size).keys()].map((i) => i + startAt);
};
</script>
