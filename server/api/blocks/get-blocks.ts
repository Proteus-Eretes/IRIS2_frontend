import { blocksMock } from '~/util/mock';
import { Block } from '~/models/block';

export default defineEventHandler(async (event) => {
    const { regattaId } = getQuery(event);
    return blocksMock.filter((block: Block) => block.regatta_id == regattaId);
});
