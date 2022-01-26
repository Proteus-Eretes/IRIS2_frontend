import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { rowersMock } from '~/util/mock';
import { Rower } from '~~/models/rower';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { crewId } = useQuery(req);
    return rowersMock.filter((rower: Rower) => rower.crew_id == crewId);
};
