import { Rower } from '~~/types/rower.model';

const BASE_URL = '/api/rowers';

export const useRowerService = () => {
	return {
		async loadRowers() {
			const url = BASE_URL + '/get-rowers';
			return await $fetch<Rower[]>(url);
		},
		async loadRowersByCrew(id: string) {
			const url = BASE_URL + '/get-rowers-by-crew?crewId=' + id;
			return await $fetch<Rower[]>(url);
		},
	};
};
