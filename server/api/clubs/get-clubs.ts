import { clubsMock } from '~/util/mock';
import { Club } from '~/models/club';

export default defineEventHandler(async (event) => {
    const { regattaId } = getQuery(event);
    return clubsMock.filter((club: Club) => club.regatta_id == regattaId);
});
