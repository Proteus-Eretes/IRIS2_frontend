import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { teamsMock } from '~/util/mock';
import { Team } from '~~/models/crew';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { fieldId } = useQuery(req);
    return [
        ...teamsMock,
        ...teamsMock,
        ...teamsMock,
        ...teamsMock,
        ...teamsMock
    ].filter((team: Team) => team.field_id == fieldId);
};
