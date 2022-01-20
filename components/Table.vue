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
            <table
                :class="[
                    hasHeaders ? 'border-b' : 'border',
                    'table min-w-full divide-y divide-gray-200 border-gray-200'
                ]"
            >
                <thead v-if="hasHeaders" class="bg-secondary-300">
                    <tr>
                        <th
                            v-for="header in headers"
                            :key="header"
                            scope="col"
                            class="px-3 py-2 text-xs"
                        >
                            {{ header }}
                        </th>
                        <th
                            v-if="actions"
                            scope="col"
                            class="relative px-3 py-2"
                        >
                            <span class="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <template v-for="(item, index) in items" :key="item.id">
                        <tr
                            v-if="isInRange(index)"
                            :class="[
                                activeId == item.id
                                    ? 'bg-secondary-50'
                                    : 'bg-white odd:bg-gray-50 hover:bg-gray-100',
                                'cursor-pointer'
                            ]"
                        >
                            <td
                                v-for="header in headers"
                                :key="header"
                                class="px-3 py-2 whitespace-nowrap"
                                @click="$emit('item-click', item)"
                            >
                                <slot
                                    :name="getSlotName(header)"
                                    :item="item"
                                    :index="index"
                                />
                            </td>

                            <td v-if="actions" class="px-3 py-2 text-center">
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
                                                            action: main.getTableActionById(
                                                                action
                                                            ),
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
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
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
import { PhDotsThree } from 'phosphor-vue';
import { TableAction } from '~~/types/table-action.model';

import { useMainStore } from '~~/stores';
const main = useMainStore();

const paginationIndex = ref(1);

interface Props {
    title: string;
    errorMessage?: string;
    headers: string[]; // Worden ook als slot names gebruikt
    actions?: string[];
    items: any[];
    activeId?: string;
    hasHeaders?: boolean;
    maxRows?: number;
}

const props = withDefaults(defineProps<Props>(), {
    activeId: '',
    hasHeaders: false,
    maxRows: 10
});

const emits = defineEmits<{
    (e: 'item-click', item: any): void;
    (e: 'action', item: { action: TableAction; item: any }): void;
}>();

// Make header name lowercase and replace whitespace with dash
const getSlotName = (header: any): string => {
    const name = header.toLowerCase();
    const regex = /\s/gi;
    return name.replaceAll(regex, '-');
};
const isInRange = (index: number): boolean => {
    return (
        index >= (paginationIndex.value - 1) * props.maxRows &&
        index < (paginationIndex.value - 1) * props.maxRows + props.maxRows
    );
};
</script>
