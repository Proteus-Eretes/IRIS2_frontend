import { Block, NewBlock } from '~~/models/block';

const BASE_URL = '/api/blocks';

export const useBlockService = () => {
    return {
        async loadBlocks(id: string) {
            const url = 'http://localhost:8080/blocks/index/' + id;
            return await $fetch<{blocks: Block[]}>(url, {
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('IdToken'),
                }
            });
        },

        async addBlock(id: string, block: NewBlock) {
            const url = 'http://localhost:8080/blocks/add/' + id;
            return await $fetch<Block>(url, {
                method: 'POST',
                body: {
                    ...block,
                    start_time: block.start_time.toISOString().slice(11, 16),
                    start_date: block.start_time.toISOString().slice(0, 10)
                },
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('IdToken'),
                }
            });
        },
        async editBlock(id: string, data: NewBlock) {
            const url = BASE_URL + '/edit-block?blockId=' + id;
            return await $fetch<Block>(url, {
                method: 'POST',
                body: data
            });
        }
    };
};
