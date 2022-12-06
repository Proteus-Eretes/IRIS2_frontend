import { crewsMock } from '~/util/mock';
import { Crew } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const { eventId } = getQuery(event);
    return crewsMock.filter((crew: Crew) => crew.event_id == eventId);
});
