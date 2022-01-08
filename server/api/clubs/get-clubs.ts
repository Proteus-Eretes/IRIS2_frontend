import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { clubsMock } from '~/util/mock';
import { Club } from '~~/types/club.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { regattaId } = useQuery(req);
	return clubsMock.filter((club: Club) => club.regatta_id == regattaId);
};
