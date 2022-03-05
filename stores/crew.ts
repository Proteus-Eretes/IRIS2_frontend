// removeData

// removeRower

// searchRowers

// updateCrewMembersOrder

// validateCrewsCategory

import { defineStore } from 'pinia';
import { useEventStore } from './event';
import { useRegattaStore } from './regatta';
import { useRowerStore } from './rower';

import { Crew, CrewDetail, Fine, NewCrew, NewTeam, Team } from '~~/models/crew';
import { Rower } from '~~/models/rower';
import { Event } from '~~/models/event';

import { useCrewService } from '~~/composables/useCrewService';
const crewService = useCrewService();

import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

interface CrewState {
    crewIds: string[];
    crewEntities: { [id: string]: Crew };
    crewDetailIds: string[];
    crewDetailEntities: { [id: string]: CrewDetail };
    teamIds: string[];
    teamEntities: { [id: string]: Team };
    fineIds: string[];
    fineEntities: { [id: string]: Fine };
    selectedCrewId: string | null;
    selectedTeamId: string | null;
    query: string;
}

export const useCrewStore = defineStore('crews', {
    state: (): CrewState => ({
        crewIds: [],
        crewEntities: {},
        crewDetailIds: [],
        crewDetailEntities: {},
        teamIds: [],
        teamEntities: {},
        fineIds: [],
        fineEntities: {},
        selectedCrewId: null,
        selectedTeamId: null,
        query: ''
    }),

    getters: {
        allCrews(state: CrewState): Crew[] {
            return state.crewIds.map((id: string) => state.crewEntities[id]);
        },
        allCrewsByEvent(state: CrewState) {
            const allCrews = state.crewIds.map(
                (id: string) => state.crewEntities[id]
            );
            const selectedId = useEventStore().selectedEventId;

            return (id: string = selectedId) => {
                return allCrews.filter((crew: Crew) => crew.event_id == id);
            };
        },
        allTeams(state: CrewState): Team[] {
            return state.teamIds.map((id: string) => state.teamEntities[id]);
        },
        allTeamsByField(state: CrewState) {
            const allTeams = state.teamIds.map(
                (id: string) => state.teamEntities[id]
            );
            const selectedId = useEventStore().selectedFieldId;

            return (id: string = selectedId) => {
                return allTeams.filter((team: Team) => team.field_id == id);
            };
        },
        allFinesByCrew(state: CrewState) {
            const allFines = state.fineIds.map(
                (id: string) => state.fineEntities[id]
            );
            const selectedId = state.selectedCrewId;

            return (id: string = selectedId) => {
                return allFines.filter((fine: Fine) => fine.crew_id == id);
            };
        },
        selectedCrew(state: CrewState): Crew {
            return (
                (state.selectedCrewId &&
                    state.crewEntities[state.selectedCrewId]) ||
                null
            );
        },
        selectedCrewDetail(state: CrewState): CrewDetail {
            return (
                (state.selectedCrewId &&
                    state.crewDetailEntities[state.selectedCrewId]) ||
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
                return (id && state.crewEntities[id]) || null;
            };
        },
        shirtNumbersByCrew(state: CrewState) {
            const allTeams = state.teamIds.map(
                (id: string) => state.teamEntities[id]
            );
            const selectedId = state.selectedCrewId;

            return (id: string = selectedId) => {
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
        queryResults(state: CrewState) {
            const allCrews = state.crewIds.map(
                (id: string) => state.crewEntities[id]
            );
            const query = state.query;

            if (!query) {
                return allCrews;
            }

            const queryText = query.toUpperCase().split(/,|\.|-/g);
            if (queryText.length === 0) {
                return allCrews;
            }

            return allCrews.filter((crew: Crew) => {
                const event: Event = useEventStore().getEventById(
                    crew.event_id
                );
                const stroke: Rower = useRowerStore().strokeByCrew(crew.id);

                const nameSearch = crew.displayName
                    .toUpperCase()
                    .replace(/\s/g, '');
                // const eventSearch = event.code.toUpperCase();
                const eventWhitespaceSearch = event
                    ? event.code.toUpperCase().replace(/\s/g, '')
                    : '';
                const strokeSearch = stroke
                    ? stroke.fullName.toUpperCase().replace(/(\.|\s)+/g, '')
                    : '';

                return queryText.every((q: string) => {
                    const query = q.replace(/\s/g, '');

                    return (
                        nameSearch.indexOf(query) !== -1 ||
                        // eventSearch.indexOf(query) !== -1 ||
                        eventWhitespaceSearch.indexOf(query) !== -1 ||
                        strokeSearch.indexOf(query) !== -1
                    );
                });
            });
        }
    },

    actions: {
        async loadCrews() {
            const regattaId = useRegattaStore().selectedId;
            if (regattaId == null) {
                return;
            }

            try {
                const loadedCrews = await crewService.loadCrews(regattaId);

                const crewIds = loadedCrews.map((crew) => crew.id);
                const crewEntities = loadedCrews.reduce(
                    (entities: { [id: string]: Crew }, crew: Crew) => {
                        return { ...entities, [crew.id]: crew };
                    },
                    {}
                );

                this.crewIds = crewIds;
                this.crewEntities = crewEntities;
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the crews'
                );
            }
        },
        async loadCrewsByEvent() {
            const eventId = useEventStore().selectedEventId;
            if (eventId == null) {
                showError('No event selected');
                return;
            }

            try {
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
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the crews'
                );
            }
        },
        async loadSelectedCrew() {
            const crewId = this.selectedCrewId;
            if (crewId == null) {
                showError('No crew selected');
                return;
            }

            try {
                const crew = await crewService.loadCrewDetail(crewId);

                this.crewDetailIds = [...this.crewDetailIds, crew.id];
                this.crewDetailEntities = {
                    ...this.crewDetailEntities,
                    [crew.id]: crew
                };
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the selected crew'
                );
            }
        },
        async loadTeams() {
            try {
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
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the teams'
                );
            }
        },
        async loadTeamsByField() {
            const fieldId = useEventStore().selectedFieldId;
            if (fieldId == null) {
                showError('No field selected');
                return;
            }

            try {
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
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the teams'
                );
            }
        },
        async loadFinesByCrew() {
            const crewId = this.selectedCrewId;
            if (crewId == null) {
                showError('No crew selected');
                return;
            }

            try {
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
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong loading the fines'
                );
            }
        },
        async addCrew(newCrew: NewCrew): Promise<string> {
            try {
                const crew = await crewService.addCrew(newCrew);

                this.crewIds = [...this.crewIds, crew.id];
                this.crewEntities = {
                    ...this.crewEntities,
                    [crew.id]: crew
                };

                return crew.id;
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong adding the crew'
                );
            }
        },
        async addTeam(newTeam: NewTeam) {
            try {
                const team = await crewService.addTeam(newTeam);

                this.teamIds = [...this.teamIds, team.id];
                this.teamEntities = {
                    ...this.teamEntities,
                    [team.id]: team
                };
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong adding the team'
                );
            }
        },
        deleteCrew(id: string) {
            this.crewIds.splice(this.crewIds.indexOf(id), 1);
            delete this.crewEntities[id];
        },
        deleteFine(id: string) {
            this.fineIds.splice(this.fineIds.indexOf(id), 1);
            delete this.fineEntities[id];
        },
        async editCrew(id: string, data: NewCrew) {
            try {
                const editedCrew = await crewService.editCrew(id, data);

                this.crewEntities[id] = editedCrew;
            } catch (error) {
                console.error(error);
                useToastService().showError(
                    'Something went wrong editing the crew'
                );
            }
        }
    }
});
