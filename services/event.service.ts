import { Event, EventDetail, Field } from '~~/types/event.model';

const BASE_URL = '/api/events';

export default {
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

	// FIXME
	useMock() {
		return true;
	},
};
