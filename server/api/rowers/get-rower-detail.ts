import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { rowerDetailsMock } from '~/util/mock';
import { Rower } from '~~/types/rower.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { rowerId } = useQuery(req);
	return rowerDetailsMock.find((rower: Rower) => rower.id == rowerId);
};
