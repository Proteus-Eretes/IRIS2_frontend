import { Field, NewField } from '~/models/event';

export default defineEventHandler(async (event) => {
    const newField: NewField = await readBody(event);

    const randomId = String(Math.floor(Math.random() * 10000));
    const field: Field = {
        id: randomId,
        block_id: newField.block_id,
        event_id: newField.event_id,
        regatta_id: newField.regatta_id,
        round_id: newField.round_id
    };

    return field;
});
