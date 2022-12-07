import { Rower, NewRower } from '~/models/rower';

export default defineEventHandler(async (event) => {
    const { rowerId } = getQuery(event);
    const rower: NewRower = await readBody(event);

    const fullName = `${rower.firstname[0]}. ${rower.middlename[0]}. ${rower.lastname}`;
    const editedRower: Rower = {
        id: String(rowerId),
        club_id: rower.club_id,
        regatta_id: rower.regatta_id,
        crew_id: rower.crew_id,
        fullName: fullName,
        knrb: rower.knrb,
        knrb_num: null,
        gender: rower.gender,
        position: rower.position,
        role: rower.role
    };

    return editedRower;
});
