import type { IncomingMessage, ServerResponse } from 'http';
import { useBody, useQuery } from 'h3';

import { Block, BlockStatus, NewBlock } from '~~/models/block';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { blockId } = useQuery(req);
    const block: NewBlock = await useBody(req);

    const editedBlock: Block = {
        id: String(blockId),
        regatta_id: block.regatta_id,
        block: block.block,
        start_time: block.start_time,
        status: BlockStatus.CREATED
    };

    return editedBlock;
};
