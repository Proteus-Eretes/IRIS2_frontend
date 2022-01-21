import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Event, NewEvent } from '~~/types/event.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newEvent: NewEvent = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const event: Event = {
        id: randomId,
        regatta_id: newEvent.regatta_id,
        parent_id: null,
        event: newEvent.number,
        number: newEvent.number,
        day: newEvent.day,
        code: newEvent.code,
        name: newEvent.name,
        category: newEvent.category,
        boat_type: newEvent.boat_type,
        crews: null,
        sub_crews: null,
        status: newEvent.status
    };

    return event;
};
