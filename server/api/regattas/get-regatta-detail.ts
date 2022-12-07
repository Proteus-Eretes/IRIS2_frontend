import { regattaDetailsMock } from '~/util/mock';
import { Regatta } from '~/models/regatta';

export default defineEventHandler(async (event) => {
    const { regattaId } = getQuery(event);
    return regattaDetailsMock.find(
        (regatta: Regatta) => regatta.id == regattaId
    );
});
