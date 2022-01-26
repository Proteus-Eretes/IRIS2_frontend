import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { crewsMock } from '~/util/mock';
import { Crew } from '~~/models/crew';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { regattaId } = useQuery(req);
    return crewsMock.filter((crew: Crew) => crew.regatta_id == regattaId);
};
