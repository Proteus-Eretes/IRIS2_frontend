<template>
	<div class="w-full h-full">
		<div class="sliding-container">
			<SlidingPanel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
			>
				<template #header>Crews</template>

				<div v-if="crews.allCrews">
					<!-- FIXME: do the action -->
					<Table
						:headers="[
							'Name',
							'Club',
							'Event',
							'Category',
							'Stroke',
							'Status',
							'Shirt numbers',
						]"
						:items="crews.allCrews"
						@item-click="selectCrew($event.id)"
						@action=""
						has-headers
					>
						<template #name="{ item }">
							<span class="text-sm font-semibold">
								{{ item.displayName }}
							</span>
						</template>

						<template #club="{ item }">
							<span class="text-sm">
								{{ item.clubName }}
							</span>
						</template>

						<template #event="{ item }">
							<span class="text-sm">
								{{
									events.getEventById(item.event_id)
										? events.getEventById(item.event_id)
												.name
										: 'Nothing'
								}}
							</span>
						</template>

						<template #category="{ item }">
							<span class="text-sm">
								{{ item.category ? item.category : '-' }}
							</span>
						</template>

						<template #stroke="{ item }">
							<span class="text-sm">{{
								rowers.getStrokeByCrew(item.id)
									? rowers.getStrokeByCrew(item.id).fullName
									: 'Nothing'
							}}</span>
						</template>

						<template #status="{ item }">
							<span class="pill text-white bg-primary-400">
								{{ getCrewStatusLabel(item.status) }}
							</span>
						</template>

						<template #shirt-numbers="{ item }">
							<span class="text-sm">
								{{
									crews
										.getShirtNumberByCrew(item.id)
										.join(', ')
								}}
							</span>
						</template>
					</Table>

					<div class="w-full p-2 flex justify-center">
						<button
							type="button"
							class="button icon-button button-secondary"
							@click="showAddCrew = true"
						>
							<ph-plus class="icon text-gray-400" />Add Crew
						</button>
					</div>
				</div>
				<div v-else>Nothing</div>
			</SlidingPanel>

			<!-- Crew panel -->
			<SlidingPanel
				:index="1"
				:activePanel="activePanel"
				@close="deselectCrew()"
				@focus="activePanel = 1"
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
				:index="2"
				:activePanel="activePanel"
				@close="deselectRower()"
				@focus="activePanel = 2"
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

		<EditorSlideOver v-model:open="showAddCrew">
			<template #header>Create a new crew</template>
			<template #subheader>Create a new crew for this regatta</template>
			Hey
		</EditorSlideOver>
	</div>
</template>

<script lang="ts" setup>
import { PhPlus } from 'phosphor-vue';

import { useCrewStore } from '~~/stores/crew';
import { useRowerStore } from '~~/stores/rower';
import { useEventStore } from '~~/stores/event';
import { useClubStore } from '~~/stores/club';

import { getCrewStatusLabel } from '~~/types/crew.model';
import { getGenderLabel, getRowerRoleLabel } from '~~/types/rower.model';
import { useDateFormatter } from '~~/composables/useDateFormatter';

const { formatDate } = useDateFormatter();

const crews = useCrewStore();
crews.loadCrews();
crews.loadTeams();

const events = useEventStore();
events.loadEvents();

const clubs = useClubStore();
clubs.loadClubs();

const rowers = useRowerStore();
rowers.loadRowers();

// The panel that is last opened
const activePanel = ref(0);
const showAddCrew = ref(false);

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const selectCrew = async (id: string) => {
	activePanel.value = 1;
	params.crew = id;

	crews.selectedCrewId = id;

	// await rowers.loadRowersByCrew();
	await crews.loadFinesByCrew();

	clubs.selectedId = crews.selectedCrew.club_id;
	await clubs.loadSelectedClub();

	events.selectedEventId = crews.selectedCrew.event_id;
};
const selectRower = (id: string) => {
	activePanel.value = 2;
	params.rower = id;

	rowers.selectedId = id;
};

const deselectCrew = () => {
	activePanel.value = 0;

	crews.selectedCrewId = null;

	delete params.crew;
};
const deselectRower = () => {
	activePanel.value = 1;

	rowers.selectedId = null;

	delete params.rower;
};

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
onMounted(async () => {
	const router = useRouter();
	const { crew, rower } = router.currentRoute.value.query;

	if (crew && typeof crew == 'string') await selectCrew(crew);
	if (rower && typeof rower == 'string') selectRower(rower);
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	layout: 'main',
});
</script>
