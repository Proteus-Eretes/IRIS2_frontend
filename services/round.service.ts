import { Round } from '~~/types/round.model';

const BASE_URL = '/api/rounds';

export default {
	async loadRounds() {
		const url = BASE_URL + '/get-rounds';
		return await $fetch<Round[]>(url);
	},
	async loadRoundsByBlock(id: string) {
		const url = BASE_URL + '/get-rounds-by-block?blockId=' + id;
		return await $fetch<Round[]>(url);
	},

	// FIXME
	useMock() {
		return true;
	},
};
