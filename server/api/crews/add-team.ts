import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { NewTeam, Team, TeamResultStatus } from '~~/models/crew';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const newTeam: NewTeam = await useBody(req);

    const randomId = String(Math.floor(Math.random() * 10000));
    const team: Team = {
        id: randomId,
        crew_id: newTeam.crew_id,
        regatta_id: newTeam.regatta_id,
        field_id: newTeam.field_id,
        result_status: TeamResultStatus.NORMAL,
        shirt_number: null
    };

    return team;
};
