import { finesMock } from '~/util/mock';
import { Fine } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const { crewId } = getQuery(event);
    return finesMock.filter((fine: Fine) => fine.crew_id == crewId);
});
