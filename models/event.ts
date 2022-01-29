import { Gender } from './rower';

export interface Event {
    id: string;
    regatta_id: string;
    parent_id: string | null; // Parent of sub_events
    event: number; // Assigned by KNRB
    number: number; // Assigned by regatta lead
    day: Date;
    code: string;
    name: string;
    category: string;
    boat_type: string;
    crews: string[] | null;
    sub_crews: string[] | null; // Wat is het verschil tussen 'sub_crews' en 'crews'?
    status: EventStatus;
}

export interface EventDetail extends Event {
    block_knrb: number | null; // Assigned by KNRB, only sometimes used
    cost_id: string;
    remarks: string;
    weighed: boolean;
    gender: Gender;
    correction_factor_boat: number;
    fields: string[] | null;
}

export interface NewEvent {
    regatta_id: string;
    number: number;
    day: Date;
    code: string;
    name: string;
    category: string;
    boat_type: string;
    remarks: string;
    weighed: boolean;
    gender: Gender;
    status: EventStatus;
}

export interface Field {
    id: string;
    block_id: string;
    event_id: string;
    regatta_id: string;
    round_id: string;
    // FIXME: hier teams weg en ook bij andere models de arrays weg
    teams: string[];
}

export interface FieldDetail extends Field {
    starting_order: number | null;
    result_status: FieldResultStatus;
    start_time: Date;
}

export interface NewField {
    block_id: string;
    event_id: string;
    regatta_id: string;
    round_id: string;
}

export enum EventStatus {
    ONGOING = '0',
    CANCELLED = '1',
    MERGED = '2'
}

export function getEventStatusLabel(status: EventStatus) {
    switch (status) {
        case EventStatus.ONGOING:
            return 'Ongoing';
        case EventStatus.CANCELLED:
            return 'Cancelled';
        case EventStatus.MERGED:
            return 'Merged';
    }
}

export enum FieldResultStatus {
    DEFAULT = 0,
    APPROVED = 1,
    UNDER_INVESTIGATION = 2,
    FINISHED = 3,
    STARTED = 4,
    FINISHING = 5,
    CANCELLED = 6
}

export function getFieldResultStatusLabel(status: FieldResultStatus) {
    switch (status) {
        case FieldResultStatus.DEFAULT:
            return '';
        case FieldResultStatus.APPROVED:
            return 'Approved';
        case FieldResultStatus.UNDER_INVESTIGATION:
            return 'Under investigation';
        case FieldResultStatus.FINISHED:
            return 'Finished';
        case FieldResultStatus.STARTED:
            return 'Started';
        case FieldResultStatus.FINISHING:
            return 'Finishing';
        case FieldResultStatus.CANCELLED:
            return 'Cancelled';
    }
}
