import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { clubDetailsMock } from '~/util/mock';
import { Club } from '~~/types/club.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { clubId } = useQuery(req);
	return clubDetailsMock.find((club: Club) => club.id == clubId);
};
