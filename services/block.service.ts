import axios from 'axios';

import { blockDetailsMock, blocksMock } from '@/util/mock';
import { Block } from '~~/types/block.model';

const BASE_URL = '';

export default {
	async loadBlocks() {
		if (this.useMock()) return { data: blocksMock };

		const url = BASE_URL + '/get-blocks';
		return await axios.get<Block[]>(url);
	},
	async loadBlockDetails() {
		if (this.useMock()) return { data: blockDetailsMock };
	},

    // FIXME
	useMock() {
		return true;
	},
};
