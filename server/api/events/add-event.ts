import { Event, NewEvent } from '~/models/event';

export default defineEventHandler(async (e) => {
    const newEvent: NewEvent = await readBody(e);

    const randomId = String(Math.floor(Math.random() * 10000));
    const event: Event = {
        id: randomId,
        regatta_id: newEvent.regatta_id,
        parent_id: null,
        event: newEvent.number,
        number: newEvent.number,
        day: newEvent.day,
        code: newEvent.code,
        name: newEvent.name,
        category: newEvent.category,
        boat_type: newEvent.boat_type,
        status: newEvent.status
    };

    return event;
});
