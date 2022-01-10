// add

// delete

// edit

// getRowerInformation

import { defineStore } from 'pinia';
import { useRegattaStore } from './regatta';

import { Rower, RowerRole } from '~~/types/rower.model';
import { useRowerService } from '~~/composables/useRowerService';
const rowerService = useRowerService();

import { useToastService } from '~~/composables/useToastService';
import { useCrewStore } from './crew';
const { showError } = useToastService();

interface RowerState {
	ids: string[];
	entities: { [id: string]: Rower };
	selectedId: string | null;
}

export const useRowerStore = defineStore('rowers', {
	state: (): RowerState => ({
		ids: [],
		entities: {},
		selectedId: null,
	}),

	getters: {
		allRowers(state: RowerState) {
			return state.ids.map((id: string) => state.entities[id]);
		},
		allRowersOfSelectedCrew(state: RowerState) {
			const allRowers = state.ids.map((id: string) => state.entities[id]);
			const selectedCrewId = useCrewStore().selectedCrewId;

			return allRowers.filter(
				(rower: Rower) =>
					rower.crew_id == selectedCrewId &&
					rower.role == RowerRole.ROWER
			);
		},
		allCoachesOfSelectedCrew(state: RowerState) {
			const allRowers = state.ids.map((id: string) => state.entities[id]);
			const selectedCrewId = useCrewStore().selectedCrewId;

			return allRowers.filter(
				(rower: Rower) =>
					rower.crew_id == selectedCrewId &&
					rower.role == RowerRole.COACH
			);
		},
		allCoxesOfSelectedCrew(state: RowerState) {
			const allRowers = state.ids.map((id: string) => state.entities[id]);
			const selectedCrewId = useCrewStore().selectedCrewId;

			return allRowers.filter(
				(rower: Rower) =>
					rower.crew_id == selectedCrewId &&
					rower.role == RowerRole.COX
			);
		},
		allFinesOfSelectedCrew(state: RowerState) {
			const allRowers = state.ids.map((id: string) => state.entities[id]);
			const selectedCrewId = useCrewStore().selectedCrewId;

			return allRowers.filter(
				(rower: Rower) => rower.crew_id == selectedCrewId
			);
		},
		selectedRower(state: RowerState) {
			return (
				(state.selectedId && state.entities[state.selectedId]) || null
			);
		},
	},

	actions: {
		async loadRowers() {
			const loadedRowers = await rowerService.loadRowers();

			const rowerIds = loadedRowers.map((rower) => rower.id);
			const rowerEntities = loadedRowers.reduce(
				(entities: { [id: string]: Rower }, rower: Rower) => {
					return { ...entities, [rower.id]: rower };
				},
				{}
			);

			this.ids = rowerIds;
			this.entities = rowerEntities;
		},
		async loadRowersByCrew() {
			const crewId = useCrewStore().selectedCrewId;
			if (crewId == null) {
				return;
			}

			const loadedRowers = await rowerService.loadRowersByCrew(crewId);

			const rowerIds = loadedRowers
				.map((rower) => rower.id)
				.filter((id: string) => this.ids.indexOf(id) == -1);
			const rowerEntities = loadedRowers.reduce(
				(entities: { [id: string]: Rower }, rower: Rower) => {
					return { ...entities, [rower.id]: rower };
				},
				{}
			);

			this.ids = [...this.ids, ...rowerIds];
			this.entities = { ...this.entities, ...rowerEntities };
		},
		add(rower: Rower) {},
		delete(rower: Rower) {},
		edit(rower: Rower) {},
		lotterySettings() {},
	},
});
