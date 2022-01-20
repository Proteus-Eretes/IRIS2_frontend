import { Location } from './location.model';

export interface Result {
    id: string;
    round_id: string;
    team_id: string;
    location_id: string;
    deviation: number; // Milliseconds
    status: ResultStatus;
    location: Location;
    time: string; // Starttijd
    times: Time[];
}

export interface Time {
    id: string;
    result_id: string;
    location_id: string;
    round_id: string;
    team_id: string;
    regatta_id: string;
    timer_id: string;
    timer_name: string;
    time: string;
    deviation: number;
    assigned: boolean;
    deleted: boolean;
    status: TimeStatus;
    stopwatch: string; // If it has been filled in manually
}

export enum ResultStatus {
    GOOD = 0,
    OKAY = 1,
    UNCLEAR = 2,
    WRONG = 3,
    EQUAL_TIMES = 4
}

export enum TimeStatus {
    ASSIGNED = 'assigned',
    DELETED = 'deleted',
    UNASSIGNED = 'unassigned'
}
