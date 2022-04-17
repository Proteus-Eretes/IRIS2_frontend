import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { eventsMock } from '~/util/mock';
import { Event } from '~~/models/event';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { regattaId } = useQuery(req);
    return eventsMock.filter((event: Event) => event.regatta_id == regattaId);
};
