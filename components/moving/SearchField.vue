<template>
    <form @submit.prevent>
        <label for="search" class="sr-only">Search</label>
        <div
            class="group relative max-w-sm rounded-md text-white transition-colors duration-200 hover:text-primary-700"
        >
            <input
                v-model="value"
                type="search"
                inputmode="search"
                autocomplete="organization"
                id="search"
                class="peer rounded-md border border-none bg-secondary-500 py-1 pl-3 pr-7 text-xs hover:bg-white focus:bg-white focus:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                placeholder=""
                aria-label="search"
                list="search-list"
            />
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 peer-focus:text-primary-700"
            >
                <span class="text-sm">
                    <ph-magnifying-glass weight="bold" title="Search" />
                </span>
            </div>
        </div>

        <datalist id="search-list">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </datalist>
    </form>
</template>

<script lang="ts" setup>
import {    PhMagnifyingGlass } from 'phosphor-vue';

interface Props {
    query: string | null; // The search query
    options: string[]; // The autocomplete options for searching
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'update:query', query: string): void;
}>();

// While typing, update the query in the parents
const value = computed({
    get() {
        return props.query;
    },
    set(value: string) {
        emits('update:query', value);
    }
});
</script>
