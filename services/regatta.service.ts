import axios from 'axios';

import { regattasMock } from '@/util/mock';
import { Regatta } from '~~/types/regatta.model';

const BASE_URL = '';

export default {
	async loadRegattas() {
		if (this.useMock()) return { data: regattasMock };

		const url = BASE_URL + '/get-regattas';
		return await axios.get<Regatta[]>(url);
	},

    // FIXME
	useMock() {
		return true;
	},
};
