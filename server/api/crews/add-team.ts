import { NewTeam, Team, TeamResultStatus } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const newTeam: NewTeam = await readBody(event);

    const randomId = String(Math.floor(Math.random() * 10000));
    const team: Team = {
        id: randomId,
        crew_id: newTeam.crew_id,
        regatta_id: newTeam.regatta_id,
        field_id: newTeam.field_id,
        result_status: TeamResultStatus.NORMAL,
        shirt_number: null,
        starting_order: 0,
        toss_reason: ''
    };

    return team;
});
