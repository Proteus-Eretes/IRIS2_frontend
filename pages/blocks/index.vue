<template>
	<div class="w-full h-full">
		<div class="sliding-container">
			<SlidingPanel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
			>
				<template #header>Blocks</template>

				<div v-if="blocks.allBlocks">
					<Table
						:headers="[
							'Block',
							'Start date',
							'Start time',
							'Status',
						]"
						:items="blocks.allBlocks"
						@item-click="selectBlock($event.id)"
					>
						<template #block="{ item }">
							<span class="text-sm font-semibold">
								Block {{ item.block }}
							</span>
						</template>

						<template #start-date="{ item }">
							<span class="text-sm">
								{{ formatDate(item.start_time) }}
							</span>
						</template>

						<template #start-time="{ item }">
							<span class="text-sm">
								{{ formatTime(item.start_time) }}
							</span>
						</template>

						<template #status="{ item }">
							<span class="pill text-white bg-primary-400">
								{{ getBlockStatusLabel(item.status) }}
							</span>
						</template>
					</Table>

					<div class="w-full p-2 flex justify-center">
						<button
							type="button"
							class="button icon-button button-secondary"
							@click="showAddBlock = true"
						>
							<PlusIcon class="icon text-gray-400" />
							Add Block
						</button>
					</div>
				</div>
				<div v-else>Nothing</div>
			</SlidingPanel>

			<SlidingPanel
				:index="1"
				:activePanel="activePanel"
				@close="deselectBlock()"
				@focus="activePanel = 1"
			>
				<template #header>
					Block
					{{
						blocks.selectedBlock != null
							? blocks.selectedBlock.block
							: ''
					}}
				</template>

				<template #header-buttons>
					<span class="pill bg-white text-secondary-500">
						{{
							blocks.selectedBlock != null
								? getBlockStatusLabel(
										blocks.selectedBlock.status
								  )
								: ''
						}}
					</span>
				</template>

				<div v-if="blocks.selectedId">
					<h3>Rounds</h3>
					<template v-if="rounds.allRoundsOfSelectedBlock">
						<div
							v-for="round in rounds.allRoundsOfSelectedBlock"
							:key="round.id"
						>
							{{ round.name }}
						</div>
					</template>

					<h3>Fields</h3>
					<template v-if="events.allFieldsOfSelectedBlock">
						<div
							v-for="field in events.allFieldsOfSelectedBlock"
							:key="field.id"
						>
							<button
								type="button"
								@click="selectField(field.id)"
							>
								{{
									events.getEventById(field.event_id)
										? events.getEventById(field.event_id)
												.name
										: 'Event'
								}}
							</button>
						</div>
					</template>
				</div>
				<div v-else>Nothing</div>
			</SlidingPanel>

			<SlidingPanel
				:index="2"
				:activePanel="activePanel"
				@close="deselectField()"
				@focus="activePanel = 2"
			>
				<template #header>
					{{
						events.selectedField && events.selectedEvent
							? events.selectedEvent.code
							: ''
					}}
				</template>

				<div v-if="events.selectedFieldId">
					<template v-if="crews.allTeamsOfSelectedField">
						<div
							v-for="team in crews.allTeamsOfSelectedField"
							:key="team.id"
						>
							<!-- <button type="button" @click="selectField(field)"> -->
							{{
								crews.getCrewById(team.crew_id)
									? crews.getCrewById(team.crew_id)
											.displayName
									: 'Crew'
							}}
							<!-- </button> -->
						</div>
					</template>
				</div>
				<div v-else>Nothing</div>
			</SlidingPanel>
		</div>

		<EditorSlideOver v-model:open="showAddBlock">
			<template #header>Create a new block</template>
			<template #subheader>Create a new block for this regatta</template>

			Hey
		</EditorSlideOver>
	</div>
</template>

<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/outline';

import { useBlockStore } from '~~/stores/block';
import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';

import { getBlockStatusLabel } from '~~/types/block.model';
import { useDateFormatter } from '~~/composables/useDateFormatter';

const { formatDate, formatTime } = useDateFormatter();

const blocks = useBlockStore();
blocks.loadBlocks();

const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();

// The panel that is last opened
const activePanel = ref(0);
const showAddBlock = ref(false);

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const selectBlock = (id: string) => {
	activePanel.value = 1;
	params.block = id;

	blocks.selectedId = id;

	events.loadFieldsByBlock();
	rounds.loadRoundsByBlock();

	events.loadEvents();
};
const selectField = (id: string) => {
	activePanel.value = 2;
	params.field = id;

	events.selectedFieldId = id;
	events.selectedEventId = events.selectedField
		? events.selectedField.event_id
		: null;

	crews.loadTeamsByField();

	crews.loadCrews();
	// events.loadSelectedEvent();
};

const deselectBlock = () => {
	activePanel.value = 0;

	blocks.selectedId = null;

	delete params.block;
};
const deselectField = () => {
	activePanel.value = 1;

	events.selectedFieldId = null;
	events.selectedEventId = null;

	delete params.field;
};

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
const router = useRouter();
const { block, field, crew, rower } = router.currentRoute.value.query;
if (block && typeof block == 'string') selectBlock(block);
if (field && typeof field == 'string') selectField(field);
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
