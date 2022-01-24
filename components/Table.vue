<template>
    <div :aria-label="title + ' table'">
        <div class="flex items-end">
            <h3
                v-if="!hasHeaders"
                class="grow pl-1 py-1 mt-2 text-xs font-medium uppercase"
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
                            scope="col"
                            class="table-cell px-3 py-2 text-xs"
                        >
                            <div class="flex items-center gap-1">
                                <span>{{ header.id }}</span>

                                <a
                                    v-if="header.sortable"
                                    @click="toggleSortDirection(header.sortId)"
                                    :class="[
                                        sortId == header.sortId
                                            ? ''
                                            : 'text-opacity-70',
                                        'text-white'
                                    ]"
                                >
                                    <ph-caret-up
                                        v-if="
                                            sortId == header.sortId &&
                                            sortDirection ==
                                                TableSortDirection.UP
                                        "
                                        weight="bold"
                                        class="w-4 h-4"
                                    />
                                    <ph-caret-down
                                        v-else
                                        weight="bold"
                                        class="w-4 h-4"
                                    />
                                </a>
                            </div>
                        </div>
                        <div
                            v-if="actions"
                            scope="col"
                            class="table-cell relative px-3 py-2"
                        >
                            <span class="sr-only">Actions</span>
                        </div>
                    </div>
                </div>
                <div class="table-row-group divide-y divide-gray-200">
                    <template v-for="(item, index) in items" :key="item.id">
                        <a
                            v-if="isInRange(index)"
                            :class="[
                                activeId == item.id
                                    ? 'bg-secondary-50'
                                    : 'bg-white odd:bg-gray-50 hover:bg-gray-100',
                                'table-row cursor-pointer'
                            ]"
                            @click="$emit('item-click', item)"
                        >
                            <div
                                v-for="header in headers"
                                :key="header.id"
                                class="table-cell px-3 py-2 whitespace-nowrap"
                            >
                                <slot
                                    :name="getSlotName(header.id)"
                                    :item="item"
                                    :index="index"
                                />
                            </div>

                            <div
                                v-if="actions"
                                class="table-cell px-3 py-2 text-center"
                            >
                                <Menu as="template">
                                    <MenuButton
                                        class="rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-secondary-500"
                                    >
                                        <span class="sr-only">
                                            Open action menu
                                        </span>

                                        <ph-dots-three
                                            class="icon inline-block text-gray-400"
                                        />
                                    </MenuButton>
                                    <Transition
                                        enter-active-class="transition ease-out duration-100"
                                        enter-from-class="opacity-0 scale-95"
                                        enter-to-class="opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="opacity-100 scale-100"
                                        leave-to-class="opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            class="origin-top-right absolute right-0 w-48 rounded-md shadow-lg py-1 text-left bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <MenuItem
                                                v-for="action in actions"
                                                :key="action"
                                                v-slot="{ active }"
                                            >
                                                <a
                                                    :class="[
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        action == 'delete'
                                                            ? 'text-danger-700'
                                                            : 'text-gray-700',
                                                        'icon-button'
                                                    ]"
                                                    @click="
                                                        $emit('action', {
                                                            action,
                                                            item
                                                        })
                                                    "
                                                >
                                                    <component
                                                        :is="
                                                            main.getTableActionById(
                                                                action
                                                            ).icon
                                                        "
                                                        :class="[
                                                            action == 'delete'
                                                                ? 'text-danger-400'
                                                                : 'text-gray-400',
                                                            'icon'
                                                        ]"
                                                    />
                                                    <span>
                                                        {{
                                                            main.getTableActionById(
                                                                action
                                                            ).setting
                                                        }}
                                                    </span>
                                                </a>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </a>
                    </template>
                </div>
            </div>
        </div>
        <template v-else>
            <div class="px-1 text-sm font-base text-gray-500">
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
                'py-2 flex items-center justify-between'
            ]"
        >
            <select
                v-model="maxRows"
                class="rounded-md text-sm py-0.5 pl-2 pr-5 bg-[right_0.125rem_center] border border-gray-200 text-primary-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-400"
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
    PhCalendarPlus,
    PhCoinVertical,
    PhListNumbers,
    PhTrash,
    PhPencil,
    PhDotsThree,
    PhCaretDown,
    PhCaretUp
} from 'phosphor-vue';

import { TableHeader } from '~~/types/table-header.model';
import { TableSortDirection } from '~~/types/table-sort-direction.model';

import { useMainStore } from '~~/stores';
const main = useMainStore();

interface Props {
    title: string;
    errorMessage?: string;
    headers: TableHeader[]; // Worden ook als slot names gebruikt
    actions?: string[];
    items: any[];
    activeId?: string;
    hasHeaders?: boolean;
    maxRows?: number;
    sortId?: string;
    sortDirection?: TableSortDirection;
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

// Make header name lowercase and replace whitespace with dash
const getSlotName = (header: string): string => {
    const regex = /\s/gi;
    const name = header.replaceAll(regex, '-');
    return name.toLowerCase();
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
