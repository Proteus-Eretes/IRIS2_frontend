import axios from 'axios';

import { eventsMock, fieldsMock } from '@/util/mock';
import { Event, Field } from '~~/types/event.model';

const BASE_URL = '';

export default {
	async loadEvents() {
		if (this.useMock()) return { data: eventsMock };

		const url = BASE_URL + '/get-events';
		return await axios.get<Event[]>(url);
	},
	async loadFields() {
		if (this.useMock()) return { data: fieldsMock };

		const url = BASE_URL + '/get-fields';
		return await axios.get<Field[]>(url);
	},

	// FIXME
	useMock() {
		return true;
	},
};
