import type { IncomingMessage, ServerResponse } from 'http';

import { teamsMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
	return teamsMock;
};
