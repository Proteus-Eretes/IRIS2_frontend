<template>
	<div class="w-full h-full">
		<div class="sliding-container">
			<SlidingPanel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
			>
				<template #header>Blocks</template>

				<template #default>
					<!-- FIXME: do the action -->
					<Table
						title="Blocks"
						:headers="[
							'Block',
							'Start date',
							'Start time',
							'Status',
						]"
						:actions="['assign', 'lots', 'shirts', 'delete']"
						:items="blocks.allBlocks"
						:activeId="blocks.selectedId"
						@item-click="selectBlock($event.id)"
						@action=""
						has-headers
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
							<ph-plus class="icon text-gray-400" />Add Block
						</button>
					</div>
				</template>
			</SlidingPanel>

			<BlocksSlidingPanel
				:index="1"
				:activePanel="activePanel"
				@close="deselectBlock()"
				@focus="activePanel = 1"
				@select-field="selectField($event)"
			/>

			<EventsSlidingPanel
				:index="2"
				:activePanel="activePanel"
				@close="deselectField()"
				@focus="activePanel = 2"
				@select-team="selectTeam($event)"
				use-field
			/>

			<CrewsSlidingPanel
				:index="3"
				:activePanel="activePanel"
				@close="deselectTeam()"
				@focus="activePanel = 3"
				@select-rower="selectRower($event)"
				use-team
			/>

			<RowersSlidingPanel
				:index="4"
				:activePanel="activePanel"
				@close="deselectRower()"
				@focus="activePanel = 4"
			/>
		</div>

		<EditorSlideOver v-model:open="showAddBlock">
			<template #header>Create a new block</template>
			<template #subheader>Create a new block for this regatta</template>
			Hey
		</EditorSlideOver>
	</div>
</template>

<script lang="ts" setup>
import { PhPlus, PhUsersThree } from 'phosphor-vue';

import { useBlockStore } from '~~/stores/block';
import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';
import { useRowerStore } from '~~/stores/rower';
import { useClubStore } from '~~/stores/club';

import { getBlockStatusLabel } from '~~/types/block.model';
import { useDateFormatter } from '~~/composables/useDateFormatter';

const { formatDate, formatTime } = useDateFormatter();

const blocks = useBlockStore();
const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();
const rowers = useRowerStore();
const clubs = useClubStore();

await blocks.loadBlocks();

// The panel that is last opened
const activePanel = ref(0);
const showAddBlock = ref(false);

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const selectBlock = async (id: string) => {
	activePanel.value = 1;
	params.block = id;

	blocks.selectedId = id;

	await events.loadFieldsByBlock();
	await rounds.loadRoundsByBlock();

	await events.loadEvents();
};
const selectField = async (id: string) => {
	activePanel.value = 2;
	params.field = id;

	events.selectedFieldId = id;
	events.selectedEventId = events.selectedField
		? events.selectedField.event_id
		: null;

	await crews.loadTeamsByField();

	await crews.loadCrews();
	// events.loadSelectedEvent();
};
const selectTeam = async (id: string) => {
	activePanel.value = 3;
	params.team = id;

	crews.selectedTeamId = id;
	crews.selectedCrewId = crews.selectedTeam
		? crews.selectedTeam.crew_id
		: null;

	await rowers.loadRowersByCrew();

	clubs.selectedId = crews.selectedCrew.club_id;
	await clubs.loadSelectedClub();
};
const selectRower = async (id: string) => {
	activePanel.value = 4;
	params.rower = id;

	rowers.selectedId = id;

	await rowers.loadSelectedRower();
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
const deselectTeam = () => {
	activePanel.value = 2;

	crews.selectedTeamId = null;
	crews.selectedCrewId = null;

	delete params.team;
};
const deselectRower = () => {
	activePanel.value = 3;

	rowers.selectedId = null;

	delete params.rower;
};

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
onMounted(async () => {
	const router = useRouter();
	const { block, field, team, rower } = router.currentRoute.value.query;

	if (block && typeof block == 'string') await selectBlock(block);
	if (field && typeof field == 'string') await selectField(field);
	if (team && typeof team == 'string') await selectTeam(team);
	if (rower && typeof rower == 'string') await selectRower(rower);
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
