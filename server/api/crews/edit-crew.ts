import type { IncomingMessage, ServerResponse } from 'http';
import { useBody, useQuery } from 'h3';

import { Crew, NewCrew } from '~~/models/crew';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { crewId } = useQuery(req);
    const crew: NewCrew = await useBody(req);

    const editedCrew: Crew = {
        id: String(crewId),
        club_id: crew.club_id,
        regatta_id: crew.regatta_id,
        event_id: crew.event_id,
        sub_event_id: null,
        status: crew.status,
        displayStatus: null,
        clubName: crew.displayName,
        displayName: crew.displayName,
        knrb_num: 123456,
        category: 'NEW',
        coxes: [],
        coaches: [],
        rowers: []
    };

    return editedCrew;
};
