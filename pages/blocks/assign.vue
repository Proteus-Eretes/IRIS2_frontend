<template>
	<div class="w-full h-full">
		<div class="container">
			<Panel class="min-w-1/4 max-h-screen" :showPanel="true">
				<template #header>Available events</template>

				<Draggable
					:model-value="events.allEvents"
					:group="{
						name: 'events',
						pull: 'clone',
						put: true,
						revertClone: true,
					}"
					item-key="id"
					class="flex flex-col h-full gap-1"
					ghost-class="hidden"
				>
					<template #item="{ element }">
						<BlocksAssignItem>
							<p class="grow text-sm">
								{{ element.name }}
							</p>

							<template #number-crews>{{
								crews.allCrewsByEventId(element.id).length
							}}</template>
						</BlocksAssignItem>
					</template>
				</Draggable>
			</Panel>

			<div
				class="
					grid grid-cols-3 grid-flow-row
					items-stretch
					gap-3
					px-3
					w-full
				"
			>
				<Panel
					v-for="block in blocks.allBlocks"
					:key="block.id"
					class="max-h-1/2-screen"
				>
					<template #header>Block {{ block.block }}</template>

					<template
						v-if="rounds.allRoundsByBlockId(block.id).length > 0"
					>
						<div
							v-for="round in rounds.allRoundsByBlockId(block.id)"
							:key="round.id"
						>
							<fieldset
								class="
									border-2 border-primary-500
									rounded-md
									p-1.5
								"
							>
								<legend class="text-primary-600 px-1">
									{{ round.name }}
								</legend>

								<Draggable
									:model-value="
										events.allFieldsByRoundId(round.id)
									"
									:group="{
										name: 'rounds',
										pull: true,
										put: ['events'],
									}"
									@change="
										changeList($event, block.id, round.id)
									"
									item-key="id"
									class="flex flex-col h-full gap-1"
									ghost-class="blocks__assign-event-ghost"
								>
									<template #item="{ element }">
										<BlocksAssignItem
											v-if="
												events.getEventById(
													element.event_id
												)
											"
										>
											<p class="grow text-sm">
												{{
													events.getEventById(
														element.event_id
													).name
												}}
											</p>

											<template #number-crews>
												{{
													crews.allCrewsByEventId(
														element.event_id
													).length
												}}
											</template>
										</BlocksAssignItem>
									</template>
								</Draggable>
							</fieldset>
						</div>
					</template>
					<template v-else>
						<button
							type="button"
							class="button button-secondary w-full"
							@click="openAssignRounds(block.id)"
						>
							Assign round
						</button>
					</template>
				</Panel>
			</div>
		</div>

		<SlideOver v-model:open="showAssignRound" @save="submitAssignRounds">
			<template #header>Assign Rounds</template>
			<template #subheader>Assign the rounds for this block</template>

			<div class="mt-4 space-y-4">
				<div
					v-for="round in rounds.allRounds"
					:key="round.id"
					class="flex items-start"
				>
					<div class="flex items-center h-5">
						<input
							:id="round.id"
							:name="round.id"
							type="checkbox"
							:value="round.id"
							v-model="roundList"
							class="
								focus:ring-secondary-400
								h-4
								w-4
								text-secondary-500
								border-gray-300
								rounded
							"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label
							:for="round.id"
							class="font-medium text-gray-700"
						>
							{{ round.name }}
						</label>
					</div>
				</div>
			</div>
		</SlideOver>
	</div>
</template>

<script lang="ts" setup>
import { useBlockStore } from '~~/stores/block';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';
import { useCrewStore } from '~~/stores/crew';

import { useToastService } from '~~/composables/useToastService';
const toastService = useToastService();

import { Event, Field } from '~~/types/event.model';

// Draggable component: https://github.com/SortableJS/vue.draggable.next
import Draggable from 'vuedraggable';

const blocks = useBlockStore();
blocks.loadBlocks();

const events = useEventStore();
events.loadEvents();
events.loadFields();

const rounds = useRoundStore();
rounds.loadRounds();

const crews = useCrewStore();
crews.loadCrews();

const changeList = (evt, blockId: string, roundId: string) => {
	if (evt.added) {
		console.log('Added', evt.added.element);
		addField(evt.added.element, blockId, roundId);
	} else if (evt.removed) {
		console.log('Removed', evt.removed.element);
		removeField(evt.removed.element);
	}
};
const addField = (event: Event, blockId: string, roundId: string) => {
	if (
		events
			.allFieldsByRoundId(roundId)
			.findIndex((field: Field) => field.event_id == event.id) != -1
	) {
		toastService.showError('Something went wrong');
		return;
	}
	events.addField(blockId, event.id, event.regatta_id, roundId);
};
const removeField = (field: Field) => {
	const confirmed = confirm('Are you sure?');
	if (!confirmed) return;

	events.deleteField(field.id);
};

const showAssignRound = ref(false);
const openAssignRounds = (id: string) => {
	showAssignRound.value = true;
	blocks.selectedId = id;
};

const submitAssignRounds = () => {
	rounds.assignRounds(roundList.value);
};
const roundList = ref([]);
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
