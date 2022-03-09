<template>
    <div
        :class="[
            'accordion transition-colors',
            isCollapsed
                ? 'border-b border-gray-300'
                : 'rounded-md bg-gray-50 shadow-sm'
        ]"
    >
        <a @click="toggleCollapse()" class="accordion-header">
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

const isCollapsed = ref(true);
const toggleCollapse = useToggle(isCollapsed);
</script>
