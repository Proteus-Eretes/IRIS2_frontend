<template>
	<div>
		<div class="sliding-container">
			<sliding-panel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
			>
				<template #header>Blocks</template>

				<div v-if="blocks.allBlocks">
					<div v-for="block in blocks.allBlocks" :key="block.id">
						<button type="button" @click="selectBlock(block.id)">
							{{ block.block }}
						</button>
					</div>

					<button type="button" @click="showAddBlock = true">
						Add Block
					</button>
				</div>
				<div v-else>Nothing</div>
			</sliding-panel>

			<sliding-panel
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
					<span
						class="
							rounded-full
							bg-white
							text-secondary-500
							font-medium
							text-sm
							px-2
						"
					>
						{{
							blocks.selectedBlock != null
								? blocks.selectedBlock.status
								: ''
						}}
					</span>
				</template>

				<div v-if="blocks.selectedBlockDetail">
					<h3>Rounds</h3>
					<template v-if="blocks.selectedBlockDetail.rounds">
						<div
							v-for="round in blocks.selectedBlockDetail.rounds"
							:key="round.id"
						>
							{{ round.name }}
						</div>
					</template>

					<h3>Fields</h3>
					<template v-if="blocks.selectedBlockDetail.fields">
						<div
							v-for="field in blocks.selectedBlockDetail.fields"
							:key="field.id"
						>
							<button type="button" @click="selectField(field.id)">
								{{ field.round.name }}
							</button>
						</div>
					</template>
				</div>
				<div v-else>Nothing</div>
			</sliding-panel>

			<sliding-panel
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

				<div v-if="events.selectedEvent">
					<template v-if="events.selectedEvent.crews">
						<div
							v-for="crew in events.selectedEvent.crews"
							:key="crew.id"
						>
							<!-- <button type="button" @click="selectField(field)"> -->
							{{ crew.name }}
							<!-- </button> -->
						</div>
					</template>
				</div>
				<div v-else>Nothing</div>
			</sliding-panel>
		</div>

		<slide-over v-model:open="showAddBlock">
			<template #header>Title</template>

			Hey
		</slide-over>
	</div>
</template>

<script lang="ts" setup>
import { useUrlSearchParams } from '@vueuse/core';

import { useBlocks } from '~~/stores/blocks';
import { useEvents } from '~~/stores/events';

import { Block } from '~~/types/block.model';
import { Field } from '~~/types/event.model';

const blocks = useBlocks();
blocks.loadBlocks();
blocks.loadBlockDetails();

const events = useEvents();
events.loadEvents();
events.loadFields();

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

	blocks.selectedId = id;

	params.block = id;
};
const selectField = (id: string) => {
	activePanel.value = 2;

	events.selectedFieldId = id;
	events.selectedEventId = events.selectedField
		? events.selectedField.event_id
		: null;

	params.field = id;
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

// TODO waarom werken urlsearchparams niet?
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
