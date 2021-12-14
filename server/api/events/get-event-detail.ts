import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { eventDetailsMock } from '~/util/mock';
import { Event } from '~~/types/event.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { eventId } = useQuery(req);
	return eventDetailsMock.find((event: Event) => event.id == eventId);
};
