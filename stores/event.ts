import { defineStore } from 'pinia';
import { useBlockStore } from './block';
import { useRegattaStore } from './regatta';

import { Event, EventDetail, Field, NewEvent, NewField } from '~/models/event';
import { useEventService } from '~/composables/useEventService';
const eventService = useEventService();

import { useToastService } from '~/composables/useToastService';
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
        allFieldsByRound(state: EventState) {
            const allFields = state.fieldIds.map(
                (id: string) => state.fieldEntities[id]
            );

            return (id: string) => {
                return allFields.filter((field: Field) => field.round_id == id);
            };
        },
        allFieldsByBlock(state: EventState) {
            const allFields = state.fieldIds.map(
                (id: string) => state.fieldEntities[id]
            );
            const selectedId = useBlockStore().selectedId;

            return (id: string = selectedId) => {
                return allFields.filter((field: Field) => field.block_id == id);
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

            try {
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
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the events');
            }
        },
        async loadSelectedEvent() {
            const eventId = this.selectedEventId;
            if (eventId == null) {
                showError('No event selected');
                return;
            }

            try {
                const event = await eventService.loadEventDetail(eventId);

                this.eventDetailIds = [...this.eventDetailIds, event.id];
                this.eventDetailEntities = {
                    ...this.eventDetailEntities,
                    [event.id]: event
                };
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the selected event');
            }
        },
        async loadFields() {
            try {
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
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the fields');
            }
        },
        async loadFieldsByBlock() {
            const blockId = useBlockStore().selectedId;
            if (blockId == null) {
                showError('No block selected');
                return;
            }

            try {
                const loadedFields = await eventService.loadFieldsByBlock(
                    blockId
                );

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
                this.fieldEntities = {
                    ...this.fieldEntities,
                    ...fieldEntities
                };
            } catch (error) {
                console.error(error);
                showError('Something went wrong loading the fields');
            }
        },
        async addEvent(newEvent: NewEvent) {
            try {
                const event = await eventService.addEvent(newEvent);

                this.eventIds = [...this.eventIds, event.id];
                this.eventEntities = {
                    ...this.eventEntities,
                    [event.id]: event
                };
            } catch (error) {
                console.error(error);
                showError('Something went wrong adding the event');
            }
        },
        async addField(newField: NewField) {
            try {
                const field = await eventService.addField(newField);

                this.fieldIds = [...this.fieldIds, field.id];
                this.fieldEntities = {
                    ...this.fieldEntities,
                    [field.id]: field
                };
            } catch (error) {
                console.error(error);
                showError('Something went wrong adding the field');
            }
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
            try {
                this.eventEntities[id] = await eventService.editEvent(id, data);
            } catch (error) {
                console.error(error);
                showError('Something went wrong editing the event');
            }
        }
    }
});
