import { Event, EventDetail, Field, NewEvent, NewField } from '~~/models/event';

const BASE_URL = '/api/events';

export const useEventService = () => {
    return {
        async loadEvents(id: string) {
            const url = BASE_URL + '/get-events?regattaId=' + id;
            return await $fetch<Event[]>(url);
        },
        async loadEventDetail(id: string) {
            const url = BASE_URL + '/get-event-detail?eventId=' + id;
            return await $fetch<EventDetail>(url);
        },
        async loadFields() {
            const url = BASE_URL + '/get-fields';
            return await $fetch<Field[]>(url);
        },
        async loadFieldsByBlock(id: string) {
            const url = BASE_URL + '/get-fields-by-block?blockId=' + id;
            return await $fetch<Field[]>(url);
        },

        async addEvent(event: NewEvent) {
            const url = BASE_URL + '/add-event';
            return await $fetch<Event>(url, { method: 'POST', body: event });
        },
        async addField(field: NewField) {
            const url = BASE_URL + '/add-field';
            return await $fetch<Field>(url, { method: 'POST', body: field });
        },
        async editEvent(id: string, data: NewEvent) {
            const url = BASE_URL + '/edit-event?eventId=' + id;
            return await $fetch<Event>(url, {
                method: 'POST',
                body: data
            });
        }
    };
};
