import { Crew, NewCrew } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const { crewId } = getQuery(event);
    const crew: NewCrew = await readBody(event);

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
        category: 'NEW'
    };

    return editedCrew;
});
