import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';

import { Field } from '~~/types/event.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const field: Field = await useBody(req);
	return field;
};
