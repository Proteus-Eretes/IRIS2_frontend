import type { IncomingMessage, ServerResponse } from 'http';
import { useBody, useQuery } from 'h3';

import { Rower, NewRower } from '~~/types/rower.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { rowerId } = useQuery(req);
    const rower: NewRower = await useBody(req);

    const fullName = `${rower.firstname[0]}. ${rower.middlename[0]}. ${rower.lastname}`;
    const editedRower: Rower = {
        id: String(rowerId),
        club_id: rower.club_id,
        regatta_id: rower.regatta_id,
        crew_id: rower.crew_id,
        fullName: fullName,
        knrb: rower.knrb,
        knrb_num: null,
        gender: rower.gender,
        position: rower.position,
        role: rower.role
    };

    return editedRower;
};
