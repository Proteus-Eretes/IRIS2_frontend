import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { blocksMock } from '~/util/mock';
import { Block } from '~~/types/block.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { regattaId } = useQuery(req);
    return blocksMock.filter((block: Block) => block.regatta_id == regattaId);
};
