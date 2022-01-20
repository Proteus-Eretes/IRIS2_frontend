import type { IncomingMessage, ServerResponse } from 'http';

import { fieldsMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
    return fieldsMock;
};
