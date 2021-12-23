// add

// delete

// edit

// getEventInformation

// index

// merge

// splitEvents

import { defineStore } from 'pinia';
import { useBlocks } from './blocks';
import { useRegattas } from './regattas';

import { Event, Field } from '~~/types/event.model';
import eventService from '~~/services/event.service';

import { useToastService } from '~~/composables/useToastService';
const toastService = useToastService();

interface EventState {
	ids: string[];
	entities: { [id: string]: Event };
	fieldIds: string[];
	fieldEntities: { [id: string]: Field };
	selectedEventId: string | null;
	selectedFieldId: string | null;
}

export const useEvents = defineStore('events', {
	state: (): EventState => ({
		ids: [],
		entities: {},
		fieldIds: [],
		fieldEntities: {},
		selectedEventId: null,
		selectedFieldId: null,
	}),

	getters: {
		allEvents(state: EventState) {
			return state.ids.map((id: string) => state.entities[id]);
		},
		allFields(state: EventState) {
			return state.fieldIds.map((id: string) => state.fieldEntities[id]);
		},
		allFieldsOfSelectedBlock(state: EventState) {
			const allFields = state.fieldIds.map(
				(id: string) => state.fieldEntities[id]
			);
			const selectedBlockId = useBlocks().selectedId;

			return allFields.filter(
				(field: Field) => field.block_id == selectedBlockId
			);
		},
		allFieldsByRoundId(state: EventState) {
			const allFields = state.fieldIds.map(
				(id: string) => state.fieldEntities[id]
			);

			return (id: string) => {
				return allFields.filter((field: Field) => field.round_id == id);
			};
		},
		selectedEvent(state: EventState) {
			return (
				(state.selectedEventId &&
					state.entities[state.selectedEventId]) ||
				null
			);
		},
		selectedField(state: EventState) {
			return (
				(state.selectedFieldId &&
					state.fieldEntities[state.selectedFieldId]) ||
				null
			);
		},
		getEventById(state: EventState) {
			return (id: string) => {
				return (id && state.entities[id]) || null;
			};
		},
	},

	actions: {
		async loadEvents() {
			const regattaId = useRegattas().selectedId;
			if (regattaId == null) {
				toastService.showError('No regatta selected');
				return;
			}

			const loadedEvents = await eventService.loadEvents(regattaId);

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
		async loadSelectedEvent() {
			const eventId = this.selectedEventId;
			if (eventId == null) {
				toastService.showError('No event selected');
				return;
			}

			const event = await eventService.loadEventDetail(eventId);

			this.detailIds = [...this.detailIds, event.id];
			this.detailEntities = {
				...this.detailEntities,
				[event.id]: event,
			};
		},
		async loadFields() {
			const loadedFields = await eventService.loadFields();

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
		async loadFieldsByBlock() {
			const blockId = useBlocks().selectedId;
			if (blockId == null) {
				toastService.showError('No block selected');
				return;
			}

			const loadedFields = await eventService.loadFieldsByBlock(blockId);

			const fieldIds = loadedFields
				.map((field) => field.id)
				.filter((id: string) => this.fieldIds.indexOf(id) == -1);
			const fieldEntities = loadedFields.reduce(
				(entities: { [id: string]: Field }, field: Field) => {
					return { ...entities, [field.id]: field };
				},
				{}
			);

			this.fieldIds = [...this.fieldIds, ...fieldIds];
			this.fieldEntities = { ...this.fieldEntities, ...fieldEntities };
		},
		add(event: Event) {},
		async addField(
			blockId: string,
			eventId: string,
			regattaId: string,
			roundId: string
		) {
			// FIXME
			const randomId = String(Math.floor(Math.random() * 10000));
			const newField: Field = {
				id: randomId,
				block_id: blockId,
				event_id: eventId,
				regatta_id: regattaId,
				round_id: roundId,
				teams: [], // FIXME
			};

			const field = await eventService.addField(newField);

			this.fieldIds = [...this.fieldIds, field.id];
			this.fieldEntities = {
				...this.fieldEntities,
				[field.id]: field,
			};
		},
		delete(event: Event) {},
		deleteField(id: string) {
			this.fieldIds.splice(this.fieldIds.indexOf(id));
			delete this.fieldEntities[id];
		},
		edit(event: Event) {},
		lotterySettings() {},
	},
});
