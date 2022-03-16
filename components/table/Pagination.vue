<template>
    <nav
        class="relative z-0 inline-flex -space-x-px rounded-md"
        aria-label="Pagination"
    >
        <button
            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:text-gray-300"
            @click="$emit('update:index', index - 1)"
            :disabled="index == min"
        >
            <span class="sr-only">Previous</span>
            <ph-caret-left class="icon" aria-hidden="true" />
        </button>
        <span
            v-if="isTooWide && index - 1 > min"
            class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        >
            ...
        </span>
        <button
            v-for="i in safeRange"
            :key="i"
            aria-current="page"
            :class="[
                i == index
                    ? 'z-10 border-secondary-500 bg-secondary-50 text-secondary-600'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center border px-4 py-2 text-sm font-medium'
            ]"
            @click="$emit('update:index', i)"
        >
            {{ i }}
        </button>
        <span
            v-if="isTooWide && index + 1 < max"
            class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        >
            ...
        </span>
        <button
            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:text-gray-300"
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
    index: number; // The index of pagination (1, 2, 3, etc.)
    amount: number; // The amount of items there are
    spacing: number; // The maxRows to show at one time
}

const props = withDefaults(defineProps<Props>(), {
    index: 1
});
const emits = defineEmits<{
    (e: 'update:index', index: number): void;
}>();

const min = 1;
const max = computed(() => {
    return Math.ceil(props.amount / props.spacing);
});

// If the max index is more than a number, show an ellipsis
const isTooWide = computed(() => {
    return max.value > 5;
});
// Show the number buttons but not if it is too wide
const safeRange = computed(() => {
    return max.value > 5
        ? range(3, useClamp(props.index - 1, 1, max.value - 2).value)
        : range(max.value, min);
});

// Generate a array of numbers for a given range
const range = (size: number, startAt: number = 1) => {
    return useRange(startAt, size + startAt);
};
</script>
