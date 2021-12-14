import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { fieldsMock } from '~/util/mock';
import { Field } from '~~/types/event.model';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { blockId } = useQuery(req);
	return fieldsMock.filter((field: Field) => field.block_id == blockId);
};
