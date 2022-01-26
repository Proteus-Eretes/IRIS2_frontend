import type { IncomingMessage, ServerResponse } from 'http';
import { useBody, useQuery } from 'h3';

import { Event, NewEvent } from '~~/types/event.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { eventId } = useQuery(req);
    const event: NewEvent = await useBody(req);

    const editedEvent: Event = {
        id: String(eventId),
        regatta_id: event.regatta_id,
        parent_id: null,
        event: event.number,
        number: event.number,
        day: event.day,
        code: event.code,
        name: event.name,
        category: event.category,
        boat_type: event.boat_type,
        crews: null,
        sub_crews: null,
        status: event.status
    };

    return editedEvent;
};
