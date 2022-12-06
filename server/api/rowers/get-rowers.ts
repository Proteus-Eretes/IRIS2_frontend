import { rowersMock } from '~/util/mock';
import { Rower } from '~/models/rower';

export default defineEventHandler(async (event) => {
    const { regattaId } = getQuery(event);
    return rowersMock.filter((rower: Rower) => rower.regatta_id == regattaId);
});
