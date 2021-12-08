import { Crew, Team } from './crew.model';
import { Round } from './round.model';

export interface Event {
	id: string;
	regatta_id: string;
	cost_id: string;
	parent_id: null; // Parent of sub_events
	event: number; // Assigned by KNRB
	number: number; // Assigned by regatta lead
	day: Date;
	code: string;
	name: string; // Is dit hetzelfde als 'code'?
	remarks: string;
	status: EventStatus;
	category: string;
	block_knrb: number | null; // Only sometimes used
	boat_type: string;
	weighed: boolean;
	sex: string;
	correction_factor_boat: number;
	sub_crews?: Crew[]; // Wat is het verschil tussen 'sub_crews' en 'crews'?
	crews?: Crew[];
	fields?: Field[];
}

export interface Field {
	id: string;
	block_id: string;
	event_id: string;
	regatta_id: string;
	round_id: string;
	starting_order: number | null;
	result_status: FieldResultStatus;
	start_time: Date;
	round?: Round;
	teams?: Team[];
	event?: Event;
}

export enum EventStatus {
	ONGOING = 0,
	CANCELLED = 1,
	MERGED = 2,
}

export enum FieldResultStatus {
	DEFAULT = 0,
    APPROVED = 1,
    UNDER_INVESTIGATION = 2,
    FINISHED = 3,
    STARTED = 4,
    FINISHING = 5,
    CANCELED = 6,
}
