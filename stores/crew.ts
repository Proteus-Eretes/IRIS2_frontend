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
        allCrewsOfSelectedEvent(state: CrewState) {
            const allCrews = state.crewIds.map(
                (id: string) => state.crewEntities[id]
            );
            const selectedEventId = useEventStore().selectedEventId;

            return allCrews.filter(
                (crew: Crew) => crew.event_id == selectedEventId
            );
        },
        allCrewsByEventId(state: CrewState) {
            const allCrews = state.crewIds.map(
                (id: string) => state.crewEntities[id]
            );

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
        allTeamsByFieldId(state: CrewState) {
            const allTeams = state.teamIds.map(
                (id: string) => state.teamEntities[id]
            );

            return (id: string) => {
                return allTeams.filter((team: Team) => team.field_id == id);
            };
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
        shirtNumbersOfSelectedCrew(state: CrewState) {
            const allTeams = state.teamIds.map(
                (id: string) => state.teamEntities[id]
            );
            const selectedCrewId = state.selectedCrewId;

            const allTeamsFilter = allTeams.filter(
                (team: Team) => team.crew_id == selectedCrewId
            );
            if (allTeamsFilter.length == 0) return [];

            const shirtNumbers = allTeamsFilter.map(
                (team: Team) => team.shirt_number
            );
            const firstNumber = shirtNumbers[0];

            return shirtNumbers.some((num: number) => num != firstNumber)
                ? shirtNumbers
                : [firstNumber];
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
        },
        async loadCrewsByEvent() {
            const eventId = useEventStore().selectedEventId;
            if (eventId == null) {
                showError('No event selected');
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
        async loadSelectedCrew() {
            const crewId = this.selectedCrewId;
            if (crewId == null) {
                showError('No crew selected');
                return;
            }

            const crew = await crewService.loadCrewDetail(crewId);

            this.crewDetailIds = [...this.crewDetailIds, crew.id];
            this.crewDetailEntities = {
                ...this.crewDetailEntities,
                [crew.id]: crew
            };
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
        async addCrew(newCrew: NewCrew): Promise<string> {
            const crew = await crewService.addCrew(newCrew);

            this.crewIds = [...this.crewIds, crew.id];
            this.crewEntities = {
                ...this.crewEntities,
                [crew.id]: crew
            };

            return crew.id;
        },
        async addTeam(newTeam: NewTeam) {
            const team = await crewService.addTeam(newTeam);

            this.teamIds = [...this.teamIds, team.id];
            this.teamEntities = {
                ...this.teamEntities,
                [team.id]: team
            };
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
            const editedCrew = await crewService.editCrew(id, data);

            this.crewEntities[id] = editedCrew;
        }
    }
});
