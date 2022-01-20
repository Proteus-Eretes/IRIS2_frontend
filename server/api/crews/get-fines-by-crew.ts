import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { finesMock } from '~/util/mock';
import { Fine } from '~~/types/crew.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { crewId } = useQuery(req);
    return finesMock.filter((fine: Fine) => fine.crew_id == crewId);
};
