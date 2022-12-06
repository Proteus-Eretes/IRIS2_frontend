import { roundsMock } from '~/util/mock';
import { Round } from '~/models/round';

export default defineEventHandler(async (event) => {
    const { blockId } = getQuery(event);
    return roundsMock.filter((round: Round) => round.block_id == blockId);
});
