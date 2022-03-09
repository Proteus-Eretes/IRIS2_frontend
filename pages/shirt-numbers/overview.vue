<template>
    <NuxtLayout name="main">
        <div class="flex h-full w-full flex-col gap-3 px-5 py-3">
            <Panel
                v-for="block in blocks.allBlocks"
                :key="block.id"
                has-padding
            >
                <template #header>Block {{ block.block }}</template>

                <template #default>
                    <template
                        v-for="field in events.allFieldsByBlock(block.id)"
                        :key="field.id"
                    >
                        <Table
                            :title="
                                events.getEventById(field.event_id)
                                    ? events.getEventById(field.event_id).code
                                    : ''
                            "
                            :actions="['edit']"
                            :headers="crewTableHeaders"
                            :items="crews.allTeamsByField(field.id)"
                            has-headers
                        >
                            <template #name="{ item }">
                                <span class="text-sm font-semibold">
                                    {{
                                        crews.getCrewById(item.crew_id)
                                            ? crews.getCrewById(item.crew_id)
                                                  .displayName
                                            : ''
                                    }}
                                </span>
                            </template>

                            <template #club="{ item }">
                                <span class="text-sm">
                                    {{
                                        crews.getCrewById(item.crew_id)
                                            ? crews.getCrewById(item.crew_id)
                                                  .clubName
                                            : ''
                                    }}
                                </span>
                            </template>

                            <template #starting-order="{ item }">
                                <span class="text-sm">
                                    {{ item.starting_order }}
                                </span>
                            </template>

                            <template #shirt-number="{ item }">
                                <span class="text-sm">
                                    {{ item.shirt_number }}
                                </span>
                            </template>
                        </Table>
                    </template>
                </template>
            </Panel>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';
import { useEventStore } from '~~/stores/event';
import { useCrewStore } from '~~/stores/crew';

import { TableHeader } from '~~/models/table';

const blocks = useBlockStore();
const events = useEventStore();
const crews = useCrewStore();

onMounted(async () => {
    await blocks.loadBlocks();

    await events.loadEvents();
    await events.loadFields();

    await crews.loadCrews();
    await crews.loadTeams();
});

const crewTableHeaders: TableHeader[] = [
    { id: 'Name', sortable: false },
    { id: 'Club', sortable: false },
    { id: 'Starting order', sortable: false },
    { id: 'Shirt number', sortable: false }
];

definePageMeta({
    layout: false
});
</script>
