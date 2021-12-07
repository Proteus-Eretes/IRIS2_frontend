// add

// delete

// edit

// getEventInformation

// index

// merge

// splitEvents

import { defineStore } from 'pinia';

import { Event, Field } from '~~/types/event.model';
import eventService from '~~/services/event.service';

interface EventState {
	ids: string[];
	entities: { [id: string]: Event };
	fieldIds: string[];
	fieldEntities: { [id: string]: Field };
	selectedEventId: string | null;
	selectedFieldId: string | null;
}

const state = (): EventState => ({
	ids: [],
	entities: {},
	fieldIds: [],
	fieldEntities: {},
	selectedEventId: null,
	selectedFieldId: null,
});

const getters = {
	allEvents(state: EventState) {
		return state.ids.map((id: string) => state.entities[id]);
	},
	selectedEvent(state: EventState) {
		return (
			(state.selectedEventId && state.entities[state.selectedEventId]) ||
			null
		);
	},
	selectedField(state: EventState) {
		return (
			(state.selectedFieldId && state.fieldEntities[state.selectedFieldId]) ||
			null
		);
	},
};

const actions = {
	async loadEvents() {
		const { data } = await eventService.loadEvents();

		const loadedEvents = data;

		const eventIds = loadedEvents.map((event) => event.id);
		const eventEntities = loadedEvents.reduce(
			(entities: { [id: string]: Event }, event: Event) => {
				return { ...entities, [event.id]: event };
			},
			{}
		);

		this.ids = eventIds;
		this.entities = eventEntities;
	},
	async loadFields() {
		const { data } = await eventService.loadFields();

		const loadedFields = data;

		const fieldIds = loadedFields.map((field) => field.id);
		const fieldEntities = loadedFields.reduce(
			(entities: { [id: string]: Field }, field: Field) => {
				return { ...entities, [field.id]: field };
			},
			{}
		);

		this.fieldIds = fieldIds;
		this.fieldEntities = fieldEntities;
	},
	add(event: Event) {},
	delete(event: Event) {},
	edit(event: Event) {},
	lotterySettings() {},
};

export const useEvents = defineStore('events', {
	state,
	getters,
	actions,
});
