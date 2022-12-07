import { eventDetailsMock } from '~/util/mock';
import { Event } from '~/models/event';

export default defineEventHandler(async (e) => {
    const { eventId } = getQuery(e);
    return eventDetailsMock.find((event: Event) => event.id == eventId);
});
