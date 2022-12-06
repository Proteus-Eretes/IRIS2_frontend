import { rowersMock } from '~/util/mock';
import { Rower } from '~/models/rower';

export default defineEventHandler(async (event) => {
    const { crewId } = getQuery(event);
    return rowersMock.filter((rower: Rower) => rower.crew_id == crewId);
});
