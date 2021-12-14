import { Regatta } from '~~/types/regatta.model';

const BASE_URL = '/api/regattas';

export default {
	async loadRegattas() {
		const url = BASE_URL + '/get-regattas';
		return await $fetch<Regatta[]>(url);
	},

    // FIXME
	useMock() {
		return true;
	},
};
