import { rowerDetailsMock } from '~/util/mock';
import { Rower } from '~/models/rower';

export default defineEventHandler(async (event) => {
    const { rowerId } = getQuery(event);
    return rowerDetailsMock.find((rower: Rower) => rower.id == rowerId);
});
