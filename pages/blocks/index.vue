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
					<!-- FIXME: do the action -->
					<Table
						:headers="[
							'Block',
							'Start date',
							'Start time',
							'Status',
						]"
						:actions="['assign', 'lots', 'shirts', 'delete']"
						:items="blocks.allBlocks"
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
				</div>
				<div v-else>Nothing</div>
			</SlidingPanel>

			<!-- Block panel -->
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

				<template #header-status>
					{{
						blocks.selectedBlock != null
							? getBlockStatusLabel(blocks.selectedBlock.status)
							: ''
					}}
				</template>

				<div v-if="blocks.selectedBlock">
					<h3 class="px-3 mt-2 py-1 text-xs font-medium uppercase">
						Rounds
					</h3>
					<div v-if="rounds.allRoundsOfSelectedBlock">
						<Table
							:headers="['Name']"
							:items="rounds.allRoundsOfSelectedBlock"
							class="pb-2 px-2"
						>
							<template #name="{ item }">
								<span class="badge text-white bg-primary-800">
									{{ item.name }}
								</span>
							</template>
						</Table>
					</div>

					<h3 class="px-3 mt-2 py-1 text-xs font-medium uppercase">
						Fields
					</h3>
					<div v-if="events.allFieldsOfSelectedBlock">
						<Table
							:headers="['Name', 'Code', 'Crews']"
							:items="events.allFieldsOfSelectedBlock"
							@item-click="selectField($event.id)"
							class="pb-2 px-2"
						>
							<template #name="{ item }">
								<span class="badge text-white bg-primary-800">
									{{
										events.getEventById(item.event_id)
											? events.getEventById(item.event_id)
													.name
											: 'Event'
									}}
								</span>
							</template>

							<template #code="{ item }">
								<span class="text-sm font-semibold">
									{{
										events.getEventById(item.event_id)
											? events.getEventById(item.event_id)
													.code
											: 'Code'
									}}
								</span>
							</template>

							<template #crews="{ item }">
								<div class="flex items-center gap-2">
									<ph-users-three
										class="icon text-primary-400"
										aria-hidden="true"
									/>

									<span class="text-xs font-medium">
										{{
											events.getEventById(item.event_id)
												? events.getEventById(
														item.event_id
												  ).crews.length
												: 0
										}}
									</span>
								</div>
							</template>
						</Table>
					</div>
				</div>
				<div v-else class="p-3 text-sm font-semibold text-danger-500">
					Nothing
				</div>
			</SlidingPanel>

			<!-- Field panel -->
			<SlidingPanel
				:index="2"
				:activePanel="activePanel"
				@close="deselectField()"
				@focus="activePanel = 2"
			>
				<template #header>
					Field
					{{ events.selectedEvent ? events.selectedEvent.code : '' }}
				</template>

				<div v-if="events.selectedEvent && events.selectedField">
					<h3 class="px-3 mt-2 py-1 text-xs font-medium uppercase">
						Teams
					</h3>
					<template v-if="crews.allTeamsOfSelectedField">
						<Table
							:headers="['Name', 'Club name', 'Rowers count']"
							:items="crews.allTeamsOfSelectedField"
							@item-click="selectTeam($event.id)"
							class="pb-2 px-2"
						>
							<template #name="{ item }">
								<span class="text-sm font-semibold">
									{{
										crews.getCrewById(item.crew_id)
											? crews.getCrewById(item.crew_id)
													.displayName
											: 'Team'
									}}
								</span>
							</template>

							<template #club-name="{ item }">
								<span class="text-sm">
									{{
										crews.getCrewById(item.crew_id)
											? crews.getCrewById(item.crew_id)
													.clubName
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

									<span class="text-xs font-medium">
										{{
											crews.getCrewById(item.crew_id)
												? crews.getCrewById(
														item.crew_id
												  ).rowers.length
												: 0
										}}
									</span>
								</div>
							</template>
						</Table>
					</template>
				</div>
				<div v-else class="p-3 text-sm font-semibold text-danger-500">
					Nothing
				</div>
			</SlidingPanel>

			<!-- Team panel -->
			<SlidingPanel
				:index="3"
				:activePanel="activePanel"
				@close="deselectTeam()"
				@focus="activePanel = 3"
			>
				<template #header>
					{{
						crews.selectedCrew ? crews.selectedCrew.displayName : ''
					}}
				</template>

				<template #header-status>
					{{
						crews.selectedCrew != null
							? crews.selectedCrew.rowers.length
							: ''
					}}
				</template>

				<div v-if="crews.selectedCrew" class="p-2">
					<div
						class="grid grid-cols-3 gap-3 p-3 bg-white border border-gray-200 rounded-md w-full text-xs"
					>
						<div>
							<h6 class="font-semibold">Crew name</h6>
							<span>{{ crews.selectedCrew.displayName }}</span>
						</div>
						<div>
							<h6 class="font-semibold">KNRB number</h6>
							<span>{{ crews.selectedCrew.knrb_num }}</span>
						</div>
						<div>
							<h6 class="font-semibold">Club</h6>
							<span>{{
								clubs.selectedClubDetail
									? clubs.selectedClubDetail.name
									: ''
							}}</span>
						</div>
						<div>
							<h6 class="font-semibold">Event code</h6>
							<span>{{
								events.selectedEvent
									? events.selectedEvent.code
									: 'Nothing'
							}}</span>
						</div>
						<div>
							<h6 class="font-semibold">Event</h6>
							<span>{{
								events.selectedEvent
									? events.selectedEvent.event
									: 'Nothing'
							}}</span>
						</div>
					</div>

					<h3 class="px-1 mt-2 py-1 text-xs font-medium uppercase">
						Rowers
					</h3>
					<div v-if="rowers.allRowersOfSelectedCrew.length > 0">
						<Table
							:headers="['Position', 'Name', 'Gender']"
							:actions="['delete']"
							:items="rowers.allRowersOfSelectedCrew"
							@item-click="selectRower($event.id)"
							class="pb-2"
						>
							<template #position="{ item }">
								<span class="badge text-white bg-primary-800">
									{{ item.position }}
								</span>
							</template>

							<template #name="{ item }">
								<span class="text-sm">
									{{ item.fullName }}
								</span>
							</template>

							<template #gender="{ item }">
								<span class="pill text-white bg-primary-400">
									{{ item.gender }}
								</span>
							</template>
						</Table>
					</div>
					<div v-else class="px-1 text-sm font-base text-gray-500">
						No rowers found
					</div>

					<h3 class="px-1 mt-2 py-1 text-xs font-medium uppercase">
						Coaches
					</h3>
					<div v-if="rowers.allCoachesOfSelectedCrew.length > 0">
						<Table
							:headers="['Position', 'Name', 'Gender']"
							:actions="['delete']"
							:items="rowers.allCoachesOfSelectedCrew"
							@item-click="selectRower($event.id)"
							class="pb-2"
						>
							<template #position="{ item }">
								<span class="badge text-white bg-primary-800">
									{{ item.position }}
								</span>
							</template>

							<template #name="{ item }">
								<span class="text-sm">
									{{ item.fullName }}
								</span>
							</template>

							<template #gender="{ item }">
								<span class="pill text-white bg-primary-400">
									{{ item.gender }}
								</span>
							</template>
						</Table>
					</div>
					<div v-else class="px-1 text-sm font-base text-gray-500">
						No coaches found
					</div>

					<h3 class="px-1 mt-2 py-1 text-xs font-medium uppercase">
						Coxes
					</h3>
					<div v-if="rowers.allCoxesOfSelectedCrew.length > 0">
						<Table
							:headers="['Position', 'Name', 'Gender']"
							:actions="['delete']"
							:items="rowers.allCoxesOfSelectedCrew"
							@item-click="selectRower($event.id)"
							class="pb-2"
						>
							<template #position="{ item }">
								<span class="badge text-white bg-primary-800">
									{{ item.position }}
								</span>
							</template>

							<template #name="{ item }">
								<span class="text-sm">
									{{ item.fullName }}
								</span>
							</template>

							<template #gender="{ item }">
								<span class="pill text-white bg-primary-400">
									{{ item.gender }}
								</span>
							</template>
						</Table>
					</div>
					<div v-else class="px-1 text-sm font-base text-gray-500">
						No coxes found
					</div>

					<h3 class="px-1 mt-2 py-1 text-xs font-medium uppercase">
						Fines
					</h3>
					<div v-if="crews.allFinesOfSelectedCrew.length > 0">
						<Table
							:headers="['Amount', 'Date']"
							:items="crews.allFinesOfSelectedCrew"
							class="pb-2"
						>
							<template #amount="{ item }">
								<span class="text-sm font-semibold">
									€ {{ item.amount }}
								</span>
							</template>

							<template #date="{ item }">
								<span class="text-sm">
									{{ formatDate(item.date, true) }}
								</span>
							</template>
						</Table>
					</div>
					<div v-else class="px-1 text-sm font-base text-gray-500">
						No fines found
					</div>
				</div>
				<div v-else class="p-3 text-sm font-semibold text-danger-500">
					Nothing
				</div>
			</SlidingPanel>

			<!-- Rower Panel -->
			<SlidingPanel
				:index="4"
				:activePanel="activePanel"
				@close="deselectRower()"
				@focus="activePanel = 4"
			>
				<template #header>
					{{
						rowers.selectedRower
							? rowers.selectedRower.fullName
							: ''
					}}
				</template>

				<div v-if="rowers.selectedRower" class="p-2">
					<div
						class="grid grid-cols-3 gap-3 p-3 bg-white border border-gray-200 rounded-md w-full text-xs"
					>
						<div>
							<h6 class="font-semibold">Full name</h6>
							<span>{{ rowers.selectedRower.fullName }}</span>
						</div>
						<div>
							<h6 class="font-semibold">Gender</h6>
							<span>
								{{
									getGenderLabel(rowers.selectedRower.gender)
								}}
							</span>
						</div>
						<div>
							<h6 class="font-semibold">Role</h6>
							<span>
								{{
									getRowerRoleLabel(rowers.selectedRower.role)
								}}
							</span>
						</div>
					</div>
				</div>
				<div v-else class="p-3 text-sm font-semibold text-danger-500">
					Nothing
				</div>
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
import { PhPlus, PhUsersThree } from 'phosphor-vue';

import { useBlockStore } from '~~/stores/block';
import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRoundStore } from '~~/stores/round';
import { useRowerStore } from '~~/stores/rower';
import { useClubStore } from '~~/stores/club';

import { getBlockStatusLabel } from '~~/types/block.model';
import { getGenderLabel, getRowerRoleLabel } from '~~/types/rower.model';
import { useDateFormatter } from '~~/composables/useDateFormatter';

const { formatDate, formatTime } = useDateFormatter();

const blocks = useBlockStore();
blocks.loadBlocks();

const events = useEventStore();
const rounds = useRoundStore();
const crews = useCrewStore();
const rowers = useRowerStore();
const clubs = useClubStore();

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
const selectRower = (id: string) => {
	activePanel.value = 4;
	params.rower = id;

	rowers.selectedId = id;
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
	if (rower && typeof rower == 'string') selectRower(rower);
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
