<template>
    <MovingPanel
        :index="index"
        :activePanel="activePanel"
        @close="$emit('close')"
        @focus="$emit('focus')"
    >
        <template #header>
            Block
            {{ blocks.selectedBlock != null ? blocks.selectedBlock.block : '' }}
        </template>

        <template #header-status>
            {{
                blocks.selectedBlock != null
                    ? getBlockStatusLabel(blocks.selectedBlock.status)
                    : ''
            }}
        </template>

        <div v-if="blocks.selectedBlock">
            <Table
                title="Rounds"
                :headers="roundsTableHeaders"
                :items="rounds.allRoundsByBlock()"
                class="px-2"
            >
                <template #name="{ item }">
                    <span class="badge bg-primary-800 text-white">
                        {{ item.name }}
                    </span>
                </template>
            </Table>

            <Table
                title="Fields"
                :headers="fieldsTableHeaders"
                :items="events.allFieldsByBlock()"
                :activeId="events.selectedFieldId"
                @item-click="$emit('select-field', $event.id)"
                class="px-2 pb-2"
            >
                <template #code="{ item }">
                    <span class="badge bg-primary-800 text-white">
                        {{
                            events.getEventById(item.event_id)
                                ? events.getEventById(item.event_id).code
                                : 'Code'
                        }}
                    </span>
                </template>

                <template #name="{ item }">
                    <span class="text-sm font-semibold">
                        {{
                            events.getEventById(item.event_id)
                                ? events.getEventById(item.event_id).name
                                : 'Event'
                        }}
                    </span>
                </template>

                <template #teams="{ item }">
                    <div class="flex items-center gap-2">
                        <ph-users-three
                            class="icon text-primary-400"
                            aria-hidden="true"
                        />

                        <span class="text-xs font-medium">
                            {{
                                crews.allTeamsByField(item.id)
                                    ? crews.allTeamsByField(item.id).length
                                    : 0
                            }}
                        </span>
                    </div>
                </template>
            </Table>
        </div>
        <div v-else class="p-3 text-sm font-semibold text-danger-500">
            Nothing
        </div>
    </MovingPanel>
</template>

<script lang="ts" setup>
import { PhUsersThree } from 'phosphor-vue';

import { useBlockStore } from '~~/stores/block';
import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';

import { getBlockStatusLabel } from '~~/models/block';
import { TableHeader } from '~~/models/table';

const blocks = useBlockStore();
const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();

interface Props {
    index: number;
    activePanel: number;
}

const props = withDefaults(defineProps<Props>(), {
    index: 0,
    activePanel: 0
});

const emits = defineEmits<{
    (e: 'focus'): void;
    (e: 'close'): void;
    (e: 'select-field', id: string): void;
}>();

const roundsTableHeaders: TableHeader[] = [{ id: 'Name', sortable: false }];
const fieldsTableHeaders: TableHeader[] = [
    { id: 'Code', sortable: false },
    { id: 'Name', sortable: false },
    { id: 'Teams', sortable: false }
];
</script>
