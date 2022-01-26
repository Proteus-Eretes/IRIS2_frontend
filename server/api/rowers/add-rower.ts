import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Rower, NewRower } from '~~/models/rower';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newRower: NewRower = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const fullName = `${newRower.firstname[0]}. ${newRower.middlename[0]}. ${newRower.lastname}`;
    const rower: Rower = {
        id: randomId,
        club_id: newRower.club_id,
        regatta_id: newRower.regatta_id,
        crew_id: newRower.crew_id,
        fullName: fullName,
        knrb: newRower.knrb,
        knrb_num: null,
        gender: newRower.gender,
        position: newRower.position,
        role: newRower.role
    };

    return rower;
};
