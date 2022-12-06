import { Block, BlockStatus, NewBlock } from '~/models/block';

export default defineEventHandler(async (event) => {
    const { blockId } = getQuery(event);
    const block: NewBlock = await readBody(event);

    const editedBlock: Block = {
        id: String(blockId),
        regatta_id: block.regatta_id,
        block: block.block,
        start_time: block.start_time,
        status: BlockStatus.CREATED
    };

    return editedBlock;
});
