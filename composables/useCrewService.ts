import { Crew, CrewDetail, Fine, NewCrew, NewTeam, Team } from '~~/models/crew';

const BASE_URL = '/api/crews';

export const useCrewService = () => {
    return {
        async loadCrews(id: string) {
            const url = BASE_URL + '/get-crews?regattaId=' + id;
            return await $fetch<Crew[]>(url);
        },
        async loadCrewsByEvent(id: string) {
            const url = BASE_URL + '/get-crews-by-event?eventId=' + id;
            return await $fetch<Crew[]>(url);
        },
        async loadCrewDetail(id: string) {
            const url = BASE_URL + '/get-crew-detail?crewId=' + id;
            return await $fetch<CrewDetail>(url);
        },
        async loadTeams() {
            const url = BASE_URL + '/get-teams';
            return await $fetch<Team[]>(url);
        },
        async loadTeamsByField(id: string) {
            const url = BASE_URL + '/get-teams-by-field?fieldId=' + id;
            return await $fetch<Team[]>(url);
        },
        async loadFinesByCrew(id: string) {
            const url = BASE_URL + '/get-fines-by-crew?crewId=' + id;
            return await $fetch<Fine[]>(url);
        },

        async addCrew(crew: NewCrew) {
            const url = BASE_URL + '/add-crew';
            return await $fetch<Crew>(url, {
                method: 'POST',
                body: crew
            });
        },
        async addTeam(team: NewTeam) {
            const url = BASE_URL + '/add-team';
            return await $fetch<Team>(url, {
                method: 'POST',
                body: team
            });
        },
        async editCrew(id: string, data: NewCrew) {
            const url = BASE_URL + '/edit-crew?crewId=' + id;
            return await $fetch<Crew>(url, {
                method: 'POST',
                body: data
            });
        }
    };
};
