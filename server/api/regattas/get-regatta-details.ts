import type { IncomingMessage, ServerResponse } from 'http';

import { regattaDetailsMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
    return regattaDetailsMock;
};
