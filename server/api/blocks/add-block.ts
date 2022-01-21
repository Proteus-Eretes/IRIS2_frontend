import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Block, BlockStatus, NewBlock } from '~~/types/block.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newBlock: NewBlock = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const block: Block = {
        id: randomId,
        regatta_id: newBlock.regatta_id,
        block: newBlock.block,
        start_time: newBlock.start_time,
        status: BlockStatus.CREATED
    };

    return block;
};
