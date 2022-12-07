import { clubDetailsMock } from '~/util/mock';
import { Club } from '~/models/club';

export default defineEventHandler(async (event) => {
    const { clubId } = getQuery(event);
    return clubDetailsMock.find((club: Club) => club.id == clubId);
});
