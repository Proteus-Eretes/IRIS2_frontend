<template>
    <div
        :class="[
            showPanel ? 'sliding-column' : 'hidden',
            activePanel > 0 ? 'min-w-multiple-column' : '',
            isMuted ? 'opacity-50' : '',
            'panel'
        ]"
        :style="`--tw-translate-x: -${translate}%;`"
    >
        <button
            type="button"
            :class="[
                isMuted ? '' : 'hidden',
                'absolute inset-0 block rounded-md bg-black opacity-0 transition-opacity hover:opacity-30'
            ]"
            @click="$emit('focus')"
            title="Focus panel"
        >
            <span v-if="!isMuted" class="sr-only">Focus panel</span>
        </button>

        <div class="panel-header">
            <h2>
                <slot name="header" />
            </h2>

            <span
                v-if="$slots['header-status']"
                class="pill bg-white text-secondary-500"
            >
                <slot name="header-status" />
            </span>

            <SlidingSearchField
                v-if="hasSearch"
                :query="search"
                @update:query="$emit('update:search', $event)"
                :options="searchOptions"
            />

            <button
                type="button"
                v-show="allowClose"
                @click="$emit('close')"
                title="Close panel"
            >
                <span class="sr-only">Close panel</span>
                <ph-x class="icon text-white" />
            </button>
        </div>

        <div class="grow">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PhX } from 'phosphor-vue';

interface Props {
    index: number;
    activePanel: number;
    search?: string | null;
    searchOptions?: string[];
    hasSearch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    index: 0,
    activePanel: 0,
    hasSearch: false
});

const emits = defineEmits<{
    (e: 'focus'): void;
    (e: 'close'): void;
    (e: 'update:search', search: string): void;
}>();

/*
 * The amount of open panels is the index of
 * the active panel plus one
 */
const amountOpenPanels = computed(() => {
    return props.activePanel + 1;
});

/*
 * The amount the panels should move is equal to the amount
 * of open panels minus 2 (the 2 that will be visible)
 */
const translate = computed(() => {
    return amountOpenPanels.value
        ? Math.max(amountOpenPanels.value - 2, 0) * 100
        : 0;
});

/*
 * The panel should be visible only if the index of
 * the active panel is greater or equal to the index of the panel
 */
const showPanel = computed(() => {
    return props.activePanel >= props.index;
});

/*
 * Mute the panel if it is off screen
 */
const isMuted = computed(() => {
    return amountOpenPanels.value > props.index + 2;
});

/*
 * Don't allow the first panel to be closed
 */
const allowClose = computed(() => {
    return props.index != 0;
});
</script>
