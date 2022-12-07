import { crewsMock } from '~/util/mock';
import { Crew } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const { regattaId } = getQuery(event);
    return crewsMock.filter((crew: Crew) => crew.regatta_id == regattaId);
});
