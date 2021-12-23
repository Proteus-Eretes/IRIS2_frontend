import { Crew, Team } from '~~/types/crew.model';

const BASE_URL = '/api/crews';

export const useCrewService = () => {
	return {
		async loadCrews(id: string) {
			const url = BASE_URL + '/get-crews?regattaId=' + id;
			return await $fetch<Crew[]>(url);
		},
		async loadTeams() {
			const url = BASE_URL + '/get-teams';
			return await $fetch<Team[]>(url);
		},
		async loadTeamsByField(id: string) {
			const url = BASE_URL + '/get-teams-by-field?fieldId=' + id;
			return await $fetch<Team[]>(url);
		},
	};
};
