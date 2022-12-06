import { Block, BlockStatus, NewBlock } from '~/models/block';

export default defineEventHandler(async (event) => {
    const newBlock: NewBlock = await readBody(event);

    const randomId = String(Math.floor(Math.random() * 10000));
    const block: Block = {
        id: randomId,
        regatta_id: newBlock.regatta_id,
        block: newBlock.block,
        start_time: newBlock.start_time,
        status: BlockStatus.CREATED
    };

    return block;
});
