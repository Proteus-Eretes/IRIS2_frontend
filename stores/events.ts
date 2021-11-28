// add

// delete

// edit

// getEventInformation

// index

// merge

// splitEvents

import { defineStore } from 'pinia';

import { Event } from '~~/types/event.model';
import eventService from '~~/services/event.service';

interface EventState {
	ids: string[];
	entities: { [id: string]: Event };
	selectedId: string | null;
}

const state = (): EventState => ({
	ids: [],
	entities: {},
	selectedId: null,
});

const getters = {
	getAllEvents(state: EventState) {
		return state.ids.map((id: string) => state.entities[id]);
	},
	getSelectedEvent(state: EventState) {
		return (state.selectedId && state.entities[state.selectedId]) || null;
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
	selectEvent(id: string) {
		this.selectedId = id;
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