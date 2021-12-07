import axios from 'axios';

import { roundsMock } from '@/util/mock';
import { Round, RoundDetail } from '~~/types/round.model';

const BASE_URL = '';

export default {
	async loadRounds() {
		if (this.useMock()) return { data: roundsMock };

		const url = BASE_URL + '/get-rounds';
		return await axios.get<RoundDetail[]>(url);
	},

	// FIXME
	useMock() {
		return true;
	},
};
