import { Regatta, NewRegatta } from '~/models/regatta';

export default defineEventHandler(async (event) => {
    const newRegatta: NewRegatta = await readBody(event);

    const randomId = String(Math.floor(Math.random() * 10000));
    const field: Regatta = {
        id: randomId,
        venue_id: newRegatta.venue_id,
        name: newRegatta.name,
        start_date: newRegatta.start_date,
        end_date: newRegatta.end_date,
        race_type: newRegatta.race_type,
        breaking_news: newRegatta.breaking_news
    };

    return field;
});
