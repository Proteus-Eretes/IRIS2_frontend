import { Rower, RowerDetail } from '~~/types/rower.model';

const BASE_URL = '/api/rowers';

export const useRowerService = () => {
	return {
		async loadRowers(id: string) {
			const url = BASE_URL + '/get-rowers?regattaId=' + id;
			return await $fetch<Rower[]>(url);
		},
		async loadRowersByCrew(id: string) {
			const url = BASE_URL + '/get-rowers-by-crew?crewId=' + id;
			return await $fetch<Rower[]>(url);
		},
		async loadRowerDetail(id: string) {
			const url = BASE_URL + '/get-rower-detail?rowerId=' + id;
			return await $fetch<RowerDetail>(url);
		},
	};
};
