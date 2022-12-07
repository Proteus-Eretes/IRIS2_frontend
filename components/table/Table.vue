<template>
    <div :aria-label="title + ' table'">
        <div class="flex items-end">
            <h3
                v-if="!hasHeaders"
                class="mt-2 grow py-1 pl-1 text-xs font-medium uppercase"
            >
                {{ title }}
            </h3>
        </div>

        <div v-if="items.length > 0" class="overflow-x-scroll">
            <div
                :class="[
                    hasHeaders ? 'border-b' : 'border',
                    'table min-w-full divide-y divide-gray-200 border-gray-200'
                ]"
            >
                <div
                    v-if="hasHeaders"
                    class="table-header-group bg-secondary-300"
                >
                    <div class="table-row">
                        <div
                            v-for="header in headers"
                            :key="header.id"
                            class="table-cell px-3 py-2 text-xs"
                        >
                            <div class="flex items-center gap-1">
                                <span>{{ header.id }}</span>

                                <a
                                    v-if="header.sortable"
                                    @click="toggleSortDirection(header.sortId)"
                                    :class="[
                                        sortId === header.sortId
                                            ? ''
                                            : 'text-opacity-70',
                                        'text-white'
                                    ]"
                                >
                                    <Icon
                                        v-if="
                                            sortId === header.sortId &&
                                            sortDirection ===
                                                TableSortDirection.UP
                                        "
                                        name="ph:caret-up"
                                        class="font-bold h-4 w-4"
                                    />
                                    <Icon
                                        name="ph:caret-down"
                                        v-else
                                        class="font-bold h-4 w-4"
                                    />
                                </a>
                            </div>
                        </div>
                        <div
                            v-if="actions"
                            class="relative table-cell px-3 py-2"
                        >
                            <span class="sr-only">Actions</span>
                        </div>
                    </div>
                </div>
                <div class="table-row-group divide-y divide-gray-200">
                    <template v-for="(item, index) in items" :key="item.id">
                        <div
                            v-if="isInRange(index)"
                            :class="[
                                activeId === item.id
                                    ? 'bg-secondary-50'
                                    : 'bg-white odd:bg-gray-50 hover:bg-gray-100',
                                'table-row cursor-pointer'
                            ]"
                        >
                            <a
                                v-for="header in headers"
                                :key="header.id"
                                class="table-cell whitespace-nowrap px-3 py-2"
                                @click="$emit('item-click', item)"
                            >
                                <slot
                                    :name="getSlotName(header.id)"
                                    :item="item"
                                    :index="index"
                                />
                            </a>

                            <TableActions
                                :actions="actions"
                                :item="item"
                                @action="$emit('action', $event)"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <template v-else>
            <div class="font-base px-1 text-sm text-gray-500">
                {{
                    errorMessage
                        ? errorMessage
                        : `No ${title.toLowerCase()} found`
                }}
            </div>
        </template>

        <div
            v-if="items.length > 10"
            :class="[
                hasHeaders ? 'px-2' : '',
                'flex items-center justify-between py-2'
            ]"
        >
            <select
                v-model="maxRows"
                class="rounded-md border border-gray-200 bg-white bg-[right_0.125rem_center] py-0.5 pl-2 pr-5 text-sm text-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2"
            >
                <option :value="10">10 rows</option>
                <option :value="15">15 rows</option>
                <option :value="20">20 rows</option>
                <option :value="9999">No limit</option>
            </select>

            <TablePagination
                v-if="items.length > maxRows"
                v-model:index="paginationIndex"
                :amount="items.length"
                :spacing="maxRows"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TableHeader, TableSortDirection } from '~~/models/table';

interface Props {
    title: string; // If a table has no headers, this is used as title but always give it a name for the error message
    errorMessage?: string; // This is the message that is shown when there are no items. This is generated based on the title, but you can give a custom message
    headers: TableHeader[]; // Worden ook als slot names gebruikt
    actions?: string[]; // These are all the actions for an item. The attributes and ids are in `stores/index.ts`
    items: any[];
    activeId?: string; // The id of the item to highlight
    hasHeaders?: boolean; // Say if the table should show headers
    maxRows?: number; // For pagination, say what the maximum amount of rows is
    sortId?: string; // For sorting, say what column should be sorted
    sortDirection?: TableSortDirection; // For sorting, say which direction to sort
}

const props = withDefaults(defineProps<Props>(), {
    activeId: '',
    hasHeaders: false,
    maxRows: 10
});

const emits = defineEmits<{
    (e: 'item-click', item: any): void;
    (e: 'action', action: { action: string; item: any }): void;
    (e: 'update:sortId', sortId: string): void;
    (e: 'update:sortDirection', sortDirection: TableSortDirection): void;
}>();

const paginationIndex = ref(1);

// Generate slot name based on header in kebab-case
const getSlotName = (header: string): string => {
    return useKebabCase(header);
};
const isInRange = (index: number): boolean => {
    return (
        index >= (paginationIndex.value - 1) * props.maxRows &&
        index < (paginationIndex.value - 1) * props.maxRows + props.maxRows
    );
};
const toggleSortDirection = (id: string) => {
    if (props.sortDirection == TableSortDirection.DOWN && props.sortId == id) {
        emits('update:sortId', id);
        emits('update:sortDirection', TableSortDirection.UP);
    } else {
        emits('update:sortId', id);
        emits('update:sortDirection', TableSortDirection.DOWN);
    }
};
</script>
