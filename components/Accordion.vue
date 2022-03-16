<template>
    <div
        :class="[
            'accordion transition-colors',
            isCollapsed
                ? 'border-b border-gray-300'
                : 'rounded-md bg-gray-50 shadow-sm'
        ]"
    >
        <a @click="updateIndex" class="accordion-header">
            <h2>
                <slot name="header">Header</slot>
            </h2>

            <ph-caret-down
                weight="bold"
                :class="[
                    'icon text-primary-700 transition-transform',
                    isCollapsed ? '-rotate-90' : ''
                ]"
            />
        </a>

        <div
            :class="['accordion-content', isCollapsed ? 'h-0' : 'h-full pb-4']"
        >
            <slot name="items"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PhCaretDown } from 'phosphor-vue';

interface Props {
    index: number; // The index of the current Accordion in its container
    selectedAccordion: number; // The index of the selected Accordion (used to collapse or expand the current Accordion)
}

const props = defineProps<Props>();
const emits = defineEmits<{
    (e: 'update:index', index: number): void;
}>();

const isCollapsed = computed(() => props.selectedAccordion != props.index);

const updateIndex = () => {
    if (props.selectedAccordion != props.index)
        emits('update:index', props.index);
    else emits('update:index', -1);
};
</script>
