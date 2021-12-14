import type { IncomingMessage, ServerResponse } from 'http';

import { crewDetailsMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
	return crewDetailsMock;
};
