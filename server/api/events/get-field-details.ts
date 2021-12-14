import type { IncomingMessage, ServerResponse } from 'http';

import { fieldDetailsMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
	return fieldDetailsMock;
};
