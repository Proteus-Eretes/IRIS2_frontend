import type { IncomingMessage, ServerResponse } from 'http';

import { roundsMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
	return roundsMock;
};
