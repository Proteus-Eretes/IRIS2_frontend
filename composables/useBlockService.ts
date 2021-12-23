import { Block } from '~~/types/block.model';

const BASE_URL = '/api/blocks';

export const useBlockService = () => {
	return {
		async loadBlocks(id: string) {
			const url = BASE_URL + '/get-blocks?regattaId=' + id;
			return await $fetch<Block[]>(url);
		},
	};
};
