<template>
    <form @submit.prevent>
        <label for="search" class="sr-only">Search</label>
        <div
            class="group relative max-w-sm rounded-md text-white hover:text-primary-700 transition-colors duration-200"
        >
            <input
                v-model="value"
                type="search"
                inputmode="search"
                autocomplete="organization"
                id="search"
                class="peer py-1 pl-3 pr-7 text-xs focus:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-secondary-500 hover:bg-white focus:bg-white border border-none rounded-md"
                placeholder=""
                aria-label="search"
                list="search-list"
            />
            <div
                class="absolute inset-y-0 right-0 pr-2 flex items-center peer-focus:text-primary-700 pointer-events-none"
            >
                <span class="text-sm">
                    <ph-magnifying-glass weight="bold" />
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
import { PhMagnifyingGlass } from 'phosphor-vue';

interface Props {
    query: string | null;
    options: string[];
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'update:query', query: string): void;
}>();

const value = computed({
    get() {
        return props.query;
    },
    set(value: string) {
        emits('update:query', value);
    }
});
</script>
