export interface Block {
    id: string;
    regatta_id: string;
    block: number;
    start_time: Date;
    status: BlockStatus;
}

export enum BlockStatus {
    CREATED = 1,
    ROUNDS_ASSIGNED = 2,
    EVENTS_ASSIGNED = 4,
    START_ORDER = 8,
    TOSSED = 16,
    SHIRT_NUMBERS_ASSIGNED = 32
}

export function getBlockStatusLabel(status: BlockStatus) {
    switch (status) {
        case BlockStatus.CREATED:
            return 'Created';
        case BlockStatus.ROUNDS_ASSIGNED:
            return 'Rounds assigned';
        case BlockStatus.EVENTS_ASSIGNED:
            return 'Events assigned';
        case BlockStatus.START_ORDER:
            return 'Start order';
        case BlockStatus.TOSSED:
            return 'Tossed';
        case BlockStatus.SHIRT_NUMBERS_ASSIGNED:
            return 'Shirt numbers assigned';
        default:
            return '';
    }
}
