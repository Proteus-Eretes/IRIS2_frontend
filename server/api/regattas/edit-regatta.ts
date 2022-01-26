import type { IncomingMessage, ServerResponse } from 'http';
import { useBody, useQuery } from 'h3';

import { Regatta, NewRegatta } from '~~/models/regatta';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { regattaId } = useQuery(req);
    const regatta: NewRegatta = await useBody(req);

    const editedRegatta: Regatta = {
        id: String(regattaId),
        venue_id: regatta.venue_id,
        name: regatta.name,
        start_date: regatta.start_date,
        end_date: regatta.end_date,
        race_type: regatta.race_type,
        breaking_news: regatta.breaking_news
    };

    return editedRegatta;
};
