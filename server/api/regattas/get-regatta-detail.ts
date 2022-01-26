import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';

import { regattaDetailsMock } from '~/util/mock';
import { Regatta } from '~~/models/regatta';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const { regattaId } = useQuery(req);
    return regattaDetailsMock.find(
        (regatta: Regatta) => regatta.id == regattaId
    );
};
