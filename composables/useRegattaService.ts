import { Regatta } from '~~/types/regatta.model';

const BASE_URL = '/api/regattas';

export const useRegattaService = () => {
	return {
		async loadRegattas() {
			const url = BASE_URL + '/get-regattas';
			return await $fetch<Regatta[]>(url);
		},
	};
};
