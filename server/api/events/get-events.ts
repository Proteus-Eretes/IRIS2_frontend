import { eventsMock } from '~/util/mock';
import { Event } from '~/models/event';

export default defineEventHandler(async (e) => {
    const { regattaId } = getQuery(e);
    return eventsMock.filter((event: Event) => event.regatta_id == regattaId);
});
