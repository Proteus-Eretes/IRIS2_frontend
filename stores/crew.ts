// add

// addCrewData

// delete

// edit

// removeData

// removeRower

// searchRowers

// updateCrewMembersOrder

// validateCrewsCategory

import { defineStore } from 'pinia';
import { useEventStore } from './event';
import { useRegattaStore } from './regatta';

import { Crew, Fine, Team } from '~~/types/crew.model';
import { useCrewService } from '~~/composables/useCrewService';
const crewService = useCrewService();

import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

interface CrewState {
	ids: string[];
	entities: { [id: string]: Crew };
	teamIds: string[];
	teamEntities: { [id: string]: Team };
	fineIds: string[];
	fineEntities: { [id: string]: Fine };
	selectedCrewId: string | null;
	selectedTeamId: string | null;
}

export const useCrewStore = defineStore('crews', {
	state: (): CrewState => ({
		ids: [],
		entities: {},
		teamIds: [],
		teamEntities: {},
		fineIds: [],
		fineEntities: {},
		selectedCrewId: null,
		selectedTeamId: null,
	}),

	getters: {
		allCrews(state: CrewState): Crew[] {
			return state.ids.map((id: string) => state.entities[id]);
		},
		allCrewsByEventId(state: CrewState) {
			const allCrews = state.ids.map((id: string) => state.entities[id]);

			return (id: string) => {
				return allCrews.filter((crew: Crew) => crew.event_id == id);
			};
		},
		allTeams(state: CrewState): Team[] {
			return state.teamIds.map((id: string) => state.teamEntities[id]);
		},
		allTeamsOfSelectedField(state: CrewState): Team[] {
			const allTeams = state.teamIds.map(
				(id: string) => state.teamEntities[id]
			);
			const selectedFieldId = useEventStore().selectedFieldId;

			return allTeams.filter(
				(team: Team) => team.field_id == selectedFieldId
			);
		},
		allFinesOfSelectedCrew(state: CrewState): Fine[] {
			const allFines = state.fineIds.map(
				(id: string) => state.fineEntities[id]
			);
			const selectedCrewId = state.selectedCrewId;

			return allFines.filter(
				(fine: Fine) => fine.crew_id == selectedCrewId
			);
		},
		selectedCrew(state: CrewState): Crew {
			return (
				(state.selectedCrewId &&
					state.entities[state.selectedCrewId]) ||
				null
			);
		},
		selectedTeam(state: CrewState): Team {
			return (
				(state.selectedTeamId &&
					state.teamEntities[state.selectedTeamId]) ||
				null
			);
		},
		getCrewById(state: CrewState) {
			return (id: string) => {
				return (id && state.entities[id]) || null;
			};
		},
		getShirtNumberByCrew(state: CrewState) {
			const allTeams = state.teamIds.map(
				(id: string) => state.teamEntities[id]
			);

			return (id: string) => {
				const allTeamsFilter = allTeams.filter(
					(team: Team) => team.crew_id == id
				);
				if (allTeamsFilter.length == 0) return [];

				const shirtNumbers = allTeamsFilter.map(
					(team: Team) => team.shirt_number
				);
				const firstNumber = shirtNumbers[0];

				return shirtNumbers.some((num: number) => num != firstNumber)
					? shirtNumbers
					: [firstNumber];
			};
		},
	},

	actions: {
		async loadCrews() {
			const regattaId = useRegattaStore().selectedId;
			if (regattaId == null) {
				return;
			}

			const loadedCrews = await crewService.loadCrews(regattaId);

			const crewIds = loadedCrews.map((crew) => crew.id);
			const crewEntities = loadedCrews.reduce(
				(entities: { [id: string]: Crew }, crew: Crew) => {
					return { ...entities, [crew.id]: crew };
				},
				{}
			);

			this.ids = crewIds;
			this.entities = crewEntities;
		},
		async loadCrewsByEvent() {
			const eventId = useEventStore().selectedEventId;
			if (eventId == null) {
				showError('No field selected');
				return;
			}

			const loadedCrews = await crewService.loadCrewsByEvent(eventId);

			const crewIds = loadedCrews
				.map((crew) => crew.id)
				.filter((id: string) => this.crewIds.indexOf(id) == -1);
			const crewEntities = loadedCrews.reduce(
				(entities: { [id: string]: Crew }, crew: Crew) => {
					return { ...entities, [crew.id]: crew };
				},
				{}
			);

			this.crewIds = [...this.crewIds, ...crewIds];
			this.crewEntities = { ...this.crewEntities, ...crewEntities };
		},
		async loadTeams() {
			const loadedTeams = await crewService.loadTeams();

			const teamIds = loadedTeams.map((team) => team.id);
			const teamEntities = loadedTeams.reduce(
				(entities: { [id: string]: Team }, team: Team) => {
					return { ...entities, [team.id]: team };
				},
				{}
			);

			this.teamIds = teamIds;
			this.teamEntities = teamEntities;
		},
		async loadTeamsByField() {
			const fieldId = useEventStore().selectedFieldId;
			if (fieldId == null) {
				showError('No field selected');
				return;
			}

			const loadedTeams = await crewService.loadTeamsByField(fieldId);

			const teamIds = loadedTeams
				.map((team) => team.id)
				.filter((id: string) => this.teamIds.indexOf(id) == -1);
			const teamEntities = loadedTeams.reduce(
				(entities: { [id: string]: Team }, team: Team) => {
					return { ...entities, [team.id]: team };
				},
				{}
			);

			this.teamIds = [...this.teamIds, ...teamIds];
			this.teamEntities = { ...this.teamEntities, ...teamEntities };
		},
		async loadFinesByCrew() {
			const crewId = this.selectedCrewId;
			if (crewId == null) {
				showError('No crew selected');
				return;
			}

			const loadedFines = await crewService.loadFinesByCrew(crewId);

			const fineIds = loadedFines
				.map((fine) => fine.id)
				.filter((id: string) => this.fineIds.indexOf(id) == -1);
			const fineEntities = loadedFines.reduce(
				(entities: { [id: string]: Fine }, fine: Fine) => {
					return { ...entities, [fine.id]: fine };
				},
				{}
			);

			this.fineIds = [...this.fineIds, ...fineIds];
			this.fineEntities = { ...this.fineEntities, ...fineEntities };
		},
		add(crew: Crew) {},
		delete(crew: Crew) {},
		edit(crew: Crew) {},
		lotterySettings() {},
	},
});
