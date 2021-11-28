import axios from 'axios';

import { blocksMock } from '@/util/mock';
import { Block } from '~~/types/block.model';

const BASE_URL = '';

export default {
	async loadBlocks() {
		if (this.useMock()) return { data: blocksMock };

		const url = BASE_URL + '/get-blocks';
		return await axios.get<Block[]>(url);
	},

    // FIXME
	useMock() {
		return true;
	},
};
