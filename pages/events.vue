<template>
	<div class="w-full h-full">
		<div class="sliding-container">
			<SlidingPanel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
			>
				<template #header>Events</template>

				<template #default>
					<!-- FIXME: do the action -->
					<Table
						title="Events"
						:headers="[
							'Number',
							'Day',
							'Code',
							'Name',
							'Crews',
							'Category',
							'Boat type',
						]"
						:actions="['edit', 'delete']"
						:items="events.allEvents"
						:activeId="events.selectedEventId"
						@item-click="selectEvent($event.id)"
						@action=""
						has-headers
					>
						<template #number="{ item }">
							<span class="badge text-white bg-primary-800">
								{{ item.number }}
							</span>
						</template>

						<template #day="{ item }">
							<span class="text-sm">
								{{ formatDate(item.day) }}
							</span>
						</template>

						<template #code="{ item }">
							<span class="text-sm">
								{{ item.code }}
							</span>
						</template>

						<template #name="{ item }">
							<span class="text-sm font-semibold">
								{{ item.name }}
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
										crews.allCrewsByEventId(item.id)
											? crews.allCrewsByEventId(item.id)
													.length
											: 0
									}}
								</span>
							</div>
						</template>

						<template #category="{ item }">
							<span
								v-if="item.category"
								class="pill text-white bg-primary-400"
							>
								{{ item.category }}
							</span>
						</template>

						<template #boat-type="{ item }">
							<span class="text-sm">
								{{ item.boat_type }}
							</span>
						</template>
					</Table>

					<div class="w-full p-2 flex justify-center">
						<button
							type="button"
							class="button icon-button button-secondary"
							@click="showAddEvent = true"
						>
							<ph-plus class="icon text-gray-400" />Add Event
						</button>
					</div>
				</template>
			</SlidingPanel>

			<!-- Event panel -->
			<SlidingPanel
				:index="1"
				:activePanel="activePanel"
				@close="deselectEvent()"
				@focus="activePanel = 1"
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

				<div v-if="events.selectedEvent" class="p-2">
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
						title="Crews"
						:headers="['Name', 'Club name', 'Rowers count']"
						:items="crews.allCrewsOfSelectedEvent"
						:activeId="crews.selectedCrewId"
						@item-click="selectCrew($event.id)"
					>
						<template #name="{ item }">
							<span class="text-sm font-semibold">
								{{
									crews.getCrewById(item.id)
										? crews.getCrewById(item.id).displayName
										: 'Team'
								}}
							</span>
						</template>

						<template #club-name="{ item }">
							<span class="text-sm">
								{{
									crews.getCrewById(item.id)
										? crews.getCrewById(item.id).clubName
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
										crews.getCrewById(item.id)
											? crews.getCrewById(item.id).rowers
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

			<!-- Crew panel -->
			<SlidingPanel
				:index="2"
				:activePanel="activePanel"
				@close="deselectCrew()"
				@focus="activePanel = 2"
			>
				<template #header>
					{{
						crews.selectedCrew ? crews.selectedCrew.displayName : ''
					}}
				</template>

				<!-- TODO: Is dit wat hier moet staan? -->
				<template #header-status>
					{{
						crews.selectedCrew
							? getCrewStatusLabel(
									crews.selectedCrew.status
							  )
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

					<Table
						title="Rowers"
						:headers="['Position', 'Name', 'Gender']"
						:actions="['delete']"
						:items="rowers.allRowersOfSelectedCrew"
						:activeId="rowers.selectedId"
						@item-click="selectRower($event.id)"
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

					<Table
						title="Coaches"
						:headers="['Position', 'Name', 'Gender']"
						:actions="['delete']"
						:items="rowers.allCoachesOfSelectedCrew"
						:activeId="rowers.selectedId"
						@item-click="selectRower($event.id)"
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

					<Table
						title="Coxes"
						:headers="['Position', 'Name', 'Gender']"
						:actions="['delete']"
						:items="rowers.allCoxesOfSelectedCrew"
						:activeId="rowers.selectedId"
						@item-click="selectRower($event.id)"
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

					<Table
						title="Fines"
						error-message="This crew didn't receive any fines"
						:headers="['Amount', 'Date']"
						:items="crews.allFinesOfSelectedCrew"
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
				<div v-else class="p-3 text-sm font-semibold text-danger-500">
					Nothing
				</div>
			</SlidingPanel>

			<!-- Rower Panel -->
			<SlidingPanel
				:index="3"
				:activePanel="activePanel"
				@close="deselectRower()"
				@focus="activePanel = 3"
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

		<EditorSlideOver v-model:open="showAddEvent">
			<template #header>Create a new event</template>
			<template #subheader>Create a new event for this regatta</template>
			Hey
		</EditorSlideOver>
	</div>
</template>

<script lang="ts" setup>
import { PhPlus, PhUsersThree } from 'phosphor-vue';

import { useCrewStore } from '~~/stores/crew';
import { useEventStore } from '~~/stores/event';
import { useRowerStore } from '~~/stores/rower';
import { useClubStore } from '~~/stores/club';

import { getEventStatusLabel } from '~~/types/event.model';
import { getCrewStatusLabel } from '~~/types/crew.model';
import { getGenderLabel, getRowerRoleLabel } from '~~/types/rower.model';
import { useDateFormatter } from '~~/composables/useDateFormatter';

const { formatDate } = useDateFormatter();

const events = useEventStore();
const crews = useCrewStore();
const rowers = useRowerStore();
const clubs = useClubStore();

await events.loadEvents();
await crews.loadCrews();

// The panel that is last opened
const activePanel = ref(0);
const showAddEvent = ref(false);

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const selectEvent = async (id: string) => {
	activePanel.value = 1;
	params.event = id;

	events.selectedEventId = id;

	// await events.loadSelectedEvent();
};
const selectCrew = async (id: string) => {
	activePanel.value = 2;
	params.crew = id;

	crews.selectedCrewId = id;

	await rowers.loadRowersByCrew();

	clubs.selectedId = crews.selectedCrew.club_id;
	await clubs.loadSelectedClub();
};
const selectRower = (id: string) => {
	activePanel.value = 3;
	params.rower = id;

	rowers.selectedId = id;
};

const deselectEvent = () => {
	activePanel.value = 0;

	events.selectedEventId = null;

	delete params.event;
};
const deselectCrew = () => {
	activePanel.value = 1;

	crews.selectedCrewId = null;

	delete params.crew;
};
const deselectRower = () => {
	activePanel.value = 2;

	rowers.selectedId = null;

	delete params.rower;
};

// TODO: waarom werken urlsearchparams niet?
// If the queries are set in the router, select the items
onMounted(async () => {
	const router = useRouter();
	const { event, crew, rower } = router.currentRoute.value.query;

	if (event && typeof event == 'string') await selectEvent(event);
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
