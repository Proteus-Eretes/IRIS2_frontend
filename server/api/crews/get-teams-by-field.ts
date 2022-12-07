import { teamsMock } from '~/util/mock';
import { Team } from '~/models/crew';

export default defineEventHandler(async (event) => {
    const { fieldId } = getQuery(event);
    return [
        ...teamsMock,
        ...teamsMock,
        ...teamsMock,
        ...teamsMock,
        ...teamsMock
    ].filter((team: Team) => team.field_id == fieldId);
});
