<template>
    <div class="blocks__assign-event group">
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
