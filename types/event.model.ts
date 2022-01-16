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
	sub_crews: string[] | null; // Wat is het verschil tussen 'sub_crews' en 'crews'?
	crews: string[] | null;
}

export interface EventDetail extends Event {
	block_knrb: number | null; // Assigned by KNRB, only sometimes used
	status: EventStatus;
	cost_id: string;
	remarks: string;
	weighed: boolean;
	sex: string;
	correction_factor_boat: number;
	fields: string[] | null;
}

export interface Field {
	id: string;
	block_id: string;
	event_id: string;
	regatta_id: string;
	round_id: string;
	teams: string[];
}

export interface FieldDetail extends Field {
	starting_order: number | null;
	result_status: FieldResultStatus;
	start_time: Date;
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
