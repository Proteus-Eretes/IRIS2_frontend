// merge

// splitEvents

import { defineStore } from 'pinia';
import { useBlockStore } from './block';
import { useRegattaStore } from './regatta';

import {
    Event,
    EventDetail,
    Field,
    NewEvent,
    NewField
} from '~~/types/event.model';
import { useEventService } from '~~/composables/useEventService';
const eventService = useEventService();

import { useToastService } from '~~/composables/useToastService';
const { showError } = useToastService();

interface EventState {
    eventIds: string[];
    eventEntities: { [id: string]: Event };
    eventDetailIds: string[];
    eventDetailEntities: { [id: string]: EventDetail };
    fieldIds: string[];
    fieldEntities: { [id: string]: Field };
    selectedEventId: string | null;
    selectedFieldId: string | null;
}

export const useEventStore = defineStore('events', {
    state: (): EventState => ({
        eventIds: [],
        eventEntities: {},
        eventDetailIds: [],
        eventDetailEntities: {},
        fieldIds: [],
        fieldEntities: {},
        selectedEventId: null,
        selectedFieldId: null
    }),

    getters: {
        allEvents(state: EventState) {
            return state.eventIds
                .map((id: string) => state.eventEntities[id])
                .sort((a: Event, b: Event) => a.event - b.event);
        },
        allFields(state: EventState) {
            return state.fieldIds.map((id: string) => state.fieldEntities[id]);
        },
        allFieldsOfSelectedBlock(state: EventState) {
            const allFields = state.fieldIds.map(
                (id: string) => state.fieldEntities[id]
            );
            const selectedBlockId = useBlockStore().selectedId;

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
                    state.eventEntities[state.selectedEventId]) ||
                null
            );
        },
        selectedEventDetail(state: EventState) {
            return (
                (state.selectedEventId &&
                    state.eventDetailEntities[state.selectedEventId]) ||
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
                return (id && state.eventEntities[id]) || null;
            };
        }
    },

    actions: {
        async loadEvents() {
            const regattaId = useRegattaStore().selectedId;
            if (regattaId == null) {
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

            this.eventIds = eventIds;
            this.eventEntities = eventEntities;
        },
        async loadSelectedEvent() {
            const eventId = this.selectedEventId;
            if (eventId == null) {
                showError('No event selected');
                return;
            }

            const event = await eventService.loadEventDetail(eventId);

            this.eventDetailIds = [...this.eventDetailIds, event.id];
            this.eventDetailEntities = {
                ...this.eventDetailEntities,
                [event.id]: event
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
            const blockId = useBlockStore().selectedId;
            if (blockId == null) {
                showError('No block selected');
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
        async addEvent(newEvent: NewEvent) {
            const event = await eventService.addEvent(newEvent);

            this.eventIds = [...this.eventIds, event.id];
            this.eventEntities = {
                ...this.eventEntities,
                [event.id]: event
            };
        },
        async addField(newField: NewField) {
            const field = await eventService.addField(newField);

            this.fieldIds = [...this.fieldIds, field.id];
            this.fieldEntities = {
                ...this.fieldEntities,
                [field.id]: field
            };
        },
        deleteEvent(id: string) {
            this.eventIds.splice(this.eventIds.indexOf(id), 1);
            delete this.eventEntities[id];
        },
        deleteField(id: string) {
            this.fieldIds.splice(this.fieldIds.indexOf(id), 1);
            delete this.fieldEntities[id];
        },
        async editEvent(id: string, data: NewEvent) {
            const editedEvent = await eventService.editEvent(id, data);

            this.eventEntities[id] = editedEvent;
        }
    }
});
