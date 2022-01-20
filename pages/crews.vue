<template>
	<div class="w-full h-full">
		<div class="sliding-container">
			<SlidingPanel
				:index="0"
				:activePanel="activePanel"
				@focus="activePanel = 0"
				v-model:search="crews.query"
				:search-options="searchOptions"
				has-search
			>
				<template #header>Crews</template>

				<div v-if="crews.allCrews">
					<!-- FIXME: do the action -->
					<Table
						title="Crews"
						:headers="[
							'Name',
							'Club',
							'Event',
							'Category',
							'Stroke',
							'Status',
							'Shirt numbers',
						]"
						:items="crews.queryResults"
						:activeId="crews.selectedCrewId"
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
												.code
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

			<CrewsSlidingPanel
				:index="1"
				:activePanel="activePanel"
				@close="deselectCrew()"
				@focus="activePanel = 1"
				@select-rower="selectRower($event)"
			/>

			<RowersSlidingPanel
				:index="2"
				:activePanel="activePanel"
				@close="deselectRower()"
				@focus="activePanel = 2"
			/>
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
import { Crew } from '~~/types/crew.model';
import { Event } from '~~/types/event.model';
import { Rower } from '~~/types/rower.model';

const crews = useCrewStore();
const events = useEventStore();
const clubs = useClubStore();
const rowers = useRowerStore();

// TODO: leg uit waarom alles meteen laden
await crews.loadCrews();
await crews.loadTeams();
await events.loadEvents();
// await clubs.loadClubs();
await rowers.loadRowers();

// The panel that is last opened
const activePanel = ref(0);
const showAddCrew = ref(false);

/*
 * useUrlSearchParams to add and delete search params in url:
 * /path?these=are&search=params
 */
const params = useUrlSearchParams('history');

const searchOptions = computed(() => {
	const allCrews = crews.allCrews.map((crew: Crew) => crew.displayName);
	const allEvents = events.allEvents.map((event: Event) => event.code);
	const allStrokes = rowers.allRowers
		.filter((rower: Rower) => rower.position == 8)
		.map((rower: Rower) => rower.fullName);

	return [...allCrews, ...allEvents, ...allStrokes];
});

const selectCrew = async (id: string) => {
	activePanel.value = 1;
	params.crew = id;

	crews.selectedCrewId = id;
	clubs.selectedId = crews.selectedCrew.club_id;
	events.selectedEventId = crews.selectedCrew.event_id;

	// await rowers.loadRowersByCrew();
	await crews.loadFinesByCrew();

	await clubs.loadSelectedClub();
};
const selectRower = async (id: string) => {
	activePanel.value = 2;
	params.rower = id;

	rowers.selectedId = id;

	await rowers.loadSelectedRower();
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
	if (rower && typeof rower == 'string') await selectRower(rower);
});
</script>

<script lang="ts">
export default defineComponent({
	layout: 'main',
});
</script>
