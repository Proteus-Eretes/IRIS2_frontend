<template>
    <div
        class="group text-primary-900 cursor-move border border-gray-200 bg-white hover:bg-secondary-50 rounded-md pl-2 pr-3 py-2 flex items-center gap-2"
    >
        <ph-dots-three-vertical
            class="icon text-white group-hover:text-primary-400"
            aria-hidden="true"
        />

        <slot />

        <ph-users-three class="icon text-primary-400" aria-hidden="true" />

        <span class="text-xs font-medium">
            <slot name="number-crews" />
        </span>
    </div>
</template>

<script lang="ts" setup>
import { PhDotsThreeVertical, PhUsersThree } from 'phosphor-vue';
</script>
