<template>
    <NuxtLayout name="main">
        <button
            type="button"
            class="button button-primary m-2"
            @click="showError('Click')"
        >
            Error
        </button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

definePageMeta({
    layout: false
});
</script>
