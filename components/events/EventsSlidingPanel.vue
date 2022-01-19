<template>
	<SlidingPanel
		:index="index"
		:activePanel="activePanel"
		@close="$emit('close')"
		@focus="$emit('focus')"
	>
		<template #header>
			{{ events.selectedEvent ? events.selectedEvent.name : '' }}
		</template>

		<template #header-status>
			{{
				events.selectedEvent
					? getEventStatusLabel(events.selectedEvent.status)
					: ''
			}}
		</template>

		<div
			v-if="events.selectedEvent && (!useField || events.selectedField)"
			class="p-2"
		>
			<div
				class="grid grid-cols-2 gap-3 p-3 bg-white border border-gray-200 rounded-md w-full text-xs"
			>
				<div>
					<h6 class="font-semibold">Event code</h6>
					<span>{{ events.selectedEvent.code }}</span>
				</div>
				<div>
					<h6 class="font-semibold">Event</h6>
					<span>{{ events.selectedEvent.name }}</span>
				</div>
			</div>

			<Table
				:title="useField ? 'Teams' : 'Crews'"
				:headers="['Name', 'Club name', 'Rowers count']"
				:items="
					useField
						? crews.allTeamsOfSelectedField
						: crews.allCrewsOfSelectedEvent
				"
				:activeId="
					useField ? crews.selectedTeamId : crews.selectedCrewId
				"
				@item-click="
					useField
						? $emit('select-team', $event.id)
						: $emit('select-crew', $event.id)
				"
			>
				<template #name="{ item }">
					<span class="text-sm font-semibold">
						{{
							getCrew(item)
								? getCrew(item).displayName
								: 'Team'
						}}
					</span>
				</template>

				<template #club-name="{ item }">
					<span class="text-sm">
						{{
							getCrew(item)
								? getCrew(item).clubName
								: 'Club'
						}}
					</span>
				</template>

				<template #rowers-count="{ item }">
					<div class="flex items-center gap-2">
						<ph-users-three
							class="icon text-primary-400"
							aria-hidden="true"
						/>

						<!-- FIXME: Rowers niet zo -->
						<span class="text-xs font-medium">
							{{
								getCrew(item)
									? getCrew(item).rowers
											.length
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
	</SlidingPanel>
</template>

<script lang="ts" setup>
import { PhUsersThree } from 'phosphor-vue';

import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';

import { getEventStatusLabel } from '~~/types/event.model';

const events = useEventStore();
const crews = useCrewStore();

interface Props {
	index: number;
	activePanel: number;
	useField?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	index: 0,
	activePanel: 0,
	useField: false,
});

const emits = defineEmits<{
	(e: 'focus'): void;
	(e: 'close'): void;
	(e: 'select-team', id: string): void;
	(e: 'select-crew', id: string): void;
}>();

const getCrew = (item: any) => {
	const id = props.useField ? item.crew_id : item.id;
	return crews.getCrewById(id);
};
</script>
