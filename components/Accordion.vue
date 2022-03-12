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

const props = defineProps<{
    index: number;
    selectedAccordion: number;
}>();
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
