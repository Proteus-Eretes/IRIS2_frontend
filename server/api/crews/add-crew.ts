import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Crew, NewCrew } from '~~/models/crew';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newCrew: NewCrew = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const crew: Crew = {
        id: randomId,
        club_id: newCrew.club_id,
        regatta_id: newCrew.regatta_id,
        event_id: newCrew.event_id,
        sub_event_id: null,
        status: newCrew.status,
        displayStatus: null,
        clubName: newCrew.displayName,
        displayName: newCrew.displayName,
        knrb_num: 123456,
        category: 'NEW'
    };

    return crew;
};
