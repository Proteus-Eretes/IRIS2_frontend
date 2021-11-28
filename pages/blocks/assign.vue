<template>
	<div class="flex flex-row min-h-full p-3">
		<SlidingPanel class="min-w-1/4 max-h-screen">
			<template #header>Available events</template>

			<Draggable
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
					<AssignItem>
						{{ element.name }} {{ element.id }}
					</AssignItem>
				</template>
			</Draggable>
		</SlidingPanel>

		<div
			class="
				grid grid-cols-3 grid-flow-row
				items-stretch
				gap-3
				px-3
				w-full
			"
		>
			<SlidingPanel
				v-for="block in blocks.getBlocks"
				:key="block.id"
				class="max-h-1/2-screen"
			>
				<template #header>Block {{ block.block }}</template>

				<Draggable
					:model-value="list2"
					@update:model-value="updateList($event, 2)"
					:group="{ name: 'blocks', pull: true, put: ['events'] }"
					@change="log"
					item-key="id"
					class="flex flex-col h-full gap-1"
					ghost-class="blocks__assign-event-ghost"
				>
					<template #item="{ element }">
						<AssignItem>
							{{ element.name }} {{ element.id }}
						</AssignItem>
					</template>
				</Draggable>
			</SlidingPanel>
		</div>
	</div>
</template>

<script lang="ts" setup>
import SlidingPanel from '~~/components/SlidingPanel.vue';
import AssignItem from '~~/components/blocks/AssignItem.vue';

// Draggable component: https://github.com/SortableJS/vue.draggable.next
import Draggable from 'vuedraggable';

import { useBlocks } from '~~/stores/blocks';

const blocks = useBlocks();
blocks.loadBlocks();

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
		alert('Has duplicates!');
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

const add = () => {
	list1.value.push({ name: 'Juan', id: 100 });
};
const clone = (el) => {
	return {
		name: el.name + ' cloned',
	};
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
