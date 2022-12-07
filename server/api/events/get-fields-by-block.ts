import { fieldsMock } from '~/util/mock';
import { Field } from '~/models/event';

export default defineEventHandler(async (event) => {
    const { blockId } = getQuery(event);
    return fieldsMock.filter((field: Field) => field.block_id == blockId);
});
