import { Event, NewEvent } from '~/models/event';

export default defineEventHandler(async (e) => {
    const { eventId } = getQuery(e);
    const event: NewEvent = await readBody(e);

    const editedEvent: Event = {
        id: String(eventId),
        regatta_id: event.regatta_id,
        parent_id: null,
        event: event.number,
        number: event.number,
        day: event.day,
        code: event.code,
        name: event.name,
        category: event.category,
        boat_type: event.boat_type,
        status: event.status
    };

    return editedEvent;
});
