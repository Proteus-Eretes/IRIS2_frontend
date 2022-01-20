import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { roundsMock } from '~/util/mock';
import { Round } from '~~/types/round.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { blockId } = useQuery(req);
    return roundsMock.filter((round: Round) => round.block_id == blockId);
};
