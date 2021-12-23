// add

// addCrewData

// delete

// edit

// getCrewInformation

// getCrews

// index

// removeData

// removeRower

// searchRowers

// updateCrewMembersOrder

// validateCrewsCategory

import { defineStore } from 'pinia';
import { useEvents } from './events';
import { useRegattas } from './regattas';

import { Crew, Team } from '~~/types/crew.model';
import crewService from '~~/services/crew.service';

import { useToastService } from '~~/composables/useToastService';
const toastService = useToastService();

interface CrewState {
	ids: string[];
	entities: { [id: string]: Crew };
	teamIds: string[];
	teamEntities: { [id: string]: Team };
	selectedCrewId: string | null;
	selectedTeamId: string | null;
}

export const useCrews = defineStore('crews', {
	state: (): CrewState => ({
		ids: [],
		entities: {},
		teamIds: [],
		teamEntities: {},
		selectedCrewId: null,
		selectedTeamId: null,
	}),

	getters: {
		allCrews(state: CrewState) {
			return state.ids.map((id: string) => state.entities[id]);
		},
		allCrewsByEventId(state: CrewState) {
			const allCrews = state.ids.map((id: string) => state.entities[id]);

			return (id: string) => {
				return allCrews.filter((crew: Crew) => crew.event_id == id);
			};
		},
		allTeams(state: CrewState) {
			return state.teamIds.map((id: string) => state.teamEntities[id]);
		},
		allTeamsOfSelectedField(state: CrewState) {
			const allTeams = state.teamIds.map(
				(id: string) => state.teamEntities[id]
			);
			const selectedFieldId = useEvents().selectedFieldId;

			return allTeams.filter(
				(team: Team) => team.field_id == selectedFieldId
			);
		},
		selectedCrew(state: CrewState) {
			return (
				(state.selectedCrewId &&
					state.entities[state.selectedCrewId]) ||
				null
			);
		},
		selectedTeam(state: CrewState) {
			return (
				(state.selectedTeamId &&
					state.entities[state.selectedTeamId]) ||
				null
			);
		},
		getCrewById(state: CrewState) {
			return (id: string) => {
				return (id && state.entities[id]) || null;
			};
		},
	},

	actions: {
		async loadCrews() {
			const regattaId = useRegattas().selectedId;
			if (regattaId == null) {
				toastService.showError('No regatta selected');
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
			const fieldId = useEvents().selectedFieldId;
			if (fieldId == null) {
				toastService.showError('No field selected');
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
		add(crew: Crew) {},
		delete(crew: Crew) {},
		edit(crew: Crew) {},
		lotterySettings() {},
	},
});
