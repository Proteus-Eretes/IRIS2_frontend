import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Regatta, NewRegatta } from '~~/models/regatta';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newRegatta: NewRegatta = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const field: Regatta = {
        id: randomId,
        venue_id: newRegatta.venue_id,
        name: newRegatta.name,
        start_date: newRegatta.start_date,
        end_date: newRegatta.end_date,
        race_type: newRegatta.race_type,
        breaking_news: newRegatta.breaking_news
    };

    return field;
};
