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
                        <div scope="col" class="table-cell">
                            <span class="hidden" aria-hidden>Drag handle</span>
                        </div>

                        <div
                            v-for="header in headers"
                            :key="header.id"
                            scope="col"
                            class="table-cell px-3 py-2 text-xs"
                        >
                            <div class="flex items-center gap-1">
                                <span>{{ header.id }}</span>
                            </div>
                        </div>

                        <div
                            v-if="actions"
                            scope="col"
                            class="relative table-cell px-3 py-2"
                        >
                            <span class="sr-only">Actions</span>
                        </div>
                    </div>
                </div>
                <Draggable
                    :model-value="items"
                    @change="changeList"
                    item-key="id"
                    class="table-row-group divide-y divide-gray-200"
                >
                    <template #item="{ element }">
                        <div
                            :class="[
                                activeId == element.id
                                    ? 'bg-secondary-50'
                                    : 'bg-white odd:bg-gray-50 hover:bg-gray-100',
                                'group table-row cursor-pointer'
                            ]"
                        >
                            <div class="handle table-cell py-2 text-center">
                                <ph-dots-six-vertical
                                    class="icon mx-1 text-white group-hover:text-primary-400"
                                    aria-hidden="true"
                                />
                            </div>

                            <a
                                v-for="header in headers"
                                :key="header.id"
                                class="table-cell whitespace-nowrap px-3 py-2"
                            >
                                <slot
                                    :name="getSlotName(header.id)"
                                    :item="element"
                                />
                            </a>

                            <TableActions
                                :actions="actions"
                                :item="element"
                                @action="$emit('action', $event)"
                            />
                        </div>
                    </template>
                </Draggable>
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
    </div>
</template>

<script lang="ts" setup>
import { PhDotsSixVertical } from 'phosphor-vue';

// Draggable component: https://github.com/SortableJS/vue.draggable.next
import Draggable from 'vuedraggable';

import { TableHeader } from '~~/models/table';

interface Props {
    title: string;
    errorMessage?: string;
    headers: TableHeader[]; // Worden ook als slot names gebruikt
    actions?: string[];
    items: any[];
    activeId?: string;
    hasHeaders?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    activeId: '',
    hasHeaders: false
});

const emits = defineEmits<{
    (e: 'action', action: { action: string; item: any }): void;
    (e: 'drag', drag: { id: string; oldIndex: number; newIndex: number }): void;
}>();

// Make header name lowercase and replace whitespace with dash
const getSlotName = (header: string): string => {
    const regex = /\s/gi;
    const name = header.replaceAll(regex, '-');
    return name.toLowerCase();
};

const changeList = (e) => {
    if (!e.moved) return;

    emits('drag', {
        id: e.moved.element.id,
        oldIndex: e.moved.oldIndex,
        newIndex: e.moved.newIndex
    });
};
</script>
