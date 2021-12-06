<template>
	<div class="container">
		<panel class="min-w-1/4 max-h-screen" :showPanel="true">
			<template #header>Available events</template>

			<draggable
				:model-value="list1"
				@update:model-value="updateEventList($event)"
				:group="{
					name: 'events',
					pull: 'clone',
					put: true,
					revertClone: true,
				}"
				@change="log"
				item-key="id"
				class="flex flex-col h-full gap-1"
				ghost-class="hidden"
			>
				<template #item="{ element }">
					<assign-item>
						<p class="flex-grow text-sm">
							{{ element.name }} {{ element.id }}
						</p>
					</assign-item>
				</template>
			</draggable>
		</panel>

		<div
			class="
				grid grid-cols-3 grid-flow-row
				items-stretch
				gap-3
				px-3
				w-full
			"
		>
			<panel
				v-for="block in blocks.getBlockDetails"
				:key="block.id"
				class="max-h-1/2-screen"
			>
				<template #header>Block {{ block.block }}</template>

				<div v-for="round in block.rounds" :key="round.id">
					<fieldset
						class="border-2 border-primary-500 rounded-md p-1.5"
					>
						<legend class="text-primary-600 px-1">
							{{ round.name }}
						</legend>

						<draggable
							:model-value="round.fields"
							@update:model-value="updateList($event, 2)"
							:group="{
								name: 'rounds',
								pull: true,
								put: ['events'],
							}"
							@change="log"
							item-key="id"
							class="flex flex-col h-full gap-1"
							ghost-class="blocks__assign-event-ghost"
						>
							<template #item="{ element }">
								<assign-item
									v-if="
										events.entities &&
										events.entities[element.id]
									"
								>
									<p class="flex-grow text-sm">
										{{ events.entities[element.id].name }}
									</p>

									<template #number-crews>
										{{
											events.entities[element.id].crews
												.length
										}}
									</template>
								</assign-item>
							</template>
						</draggable>
					</fieldset>
				</div>
			</panel>
		</div>
	</div>
</template>

<script lang="ts" setup>
import AssignItem from '~~/components/blocks/AssignItem.vue';

// Draggable component: https://github.com/SortableJS/vue.draggable.next
import draggable from 'vuedraggable';

import { useBlocks } from '~~/stores/blocks';
const blocks = useBlocks();
blocks.loadBlockDetails();

import { useEvents } from '~/stores/events';
const events = useEvents();
events.loadEvents();

const list1 = ref([
	{ name: 'John', id: 1 },
	{ name: 'Joao', id: 2 },
	{ name: 'Jean', id: 3 },
	{ name: 'Gerard', id: 4 },
]);
const list2 = ref([
	{ name: 'Juan', id: 5 },
	{ name: 'Edgard', id: 6 },
	{ name: 'Johnson', id: 7 },
]);
const list3 = ref([
	{ name: 'Jan', id: 8 },
	{ name: 'Pieter', id: 9 },
]);

const updateEventList = (list: any[]) => {
	// Do not update when user tries to put item back
	if (list.length > list1.value.length) return;
	list1.value = list;
};
const updateList = (list: any[], id: number) => {
	const hasDuplicates = (array) => {
		return new Set(array).size !== array.length;
	};

	if (hasDuplicates(list)) {
		alert('Already exists in list!');
		return;
	}

	switch (id) {
		case 2:
			list2.value = list;
			break;
		case 3:
			list3.value = list;
			break;
		default:
			break;
	}
};

const log = (evt) => {
	window.console.log(evt);
};
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
