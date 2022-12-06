import { Regatta, NewRegatta } from '~/models/regatta';

export default defineEventHandler(async (event) => {
    const { regattaId } = getQuery(event);
    const regatta: NewRegatta = await readBody(event);

    const editedRegatta: Regatta = {
        id: String(regattaId),
        venue_id: regatta.venue_id,
        name: regatta.name,
        start_date: regatta.start_date,
        end_date: regatta.end_date,
        race_type: regatta.race_type,
        breaking_news: regatta.breaking_news
    };

    return editedRegatta;
});
