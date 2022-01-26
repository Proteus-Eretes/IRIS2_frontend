import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { crewDetailsMock } from '~/util/mock';
import { Crew } from '~~/types/crew.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { crewId } = useQuery(req);
    return crewDetailsMock.find((crew: Crew) => crew.id == crewId);
};
