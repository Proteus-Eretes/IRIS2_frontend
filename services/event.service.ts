import axios from 'axios';

import { eventsMock } from '@/util/mock';
import { Event } from '~~/types/event.model';

const BASE_URL = '';

export default {
	async loadEvents() {
		if (this.useMock()) return { data: eventsMock };

		const url = BASE_URL + '/get-events';
		return await axios.get<Event[]>(url);
	},

    // FIXME
	useMock() {
		return true;
	},
};
