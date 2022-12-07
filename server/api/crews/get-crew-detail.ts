import { crewDetailsMock } from '~/util/mock';
import { Crew } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const { crewId } = getQuery(event);
    return crewDetailsMock.find((crew: Crew) => crew.id == crewId);
});
