import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Field, NewField } from '~~/types/event.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newField: NewField = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const field: Field = {
        id: randomId,
        block_id: newField.block_id,
        event_id: newField.event_id,
        regatta_id: newField.regatta_id,
        round_id: newField.round_id,
        teams: []
    };

    return field;
};
