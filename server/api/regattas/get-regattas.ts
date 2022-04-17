import type { IncomingMessage, ServerResponse } from 'http';

import { regattasMock } from '~/util/mock';

export default async (req: IncomingMessage, res: ServerResponse) => {
    return regattasMock;
};
