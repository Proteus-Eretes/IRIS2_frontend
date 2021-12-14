export interface Crew {
	id: string;
	club_id: string;
	regatta_id: string;
	event_id: string;
	sub_event_id: string | null; // Als er te weinig ploegen zijn voor een eigen veld
	displayName: string; // Preferred display name
	displayStatus: CrewStatus;
	coxes: string[] | null;
	coaches: string[] | null;
	rowers: string[] | null;
}

export interface CrewDetail extends Crew {
	name: string;
	knrb_num: number;
	knrb_sequence: number; // Aangewezen door KNRB
	sequence: number; // Van wedstrijdleiding
	status: CrewStatus;
	result_status: TeamResultStatus;
	shortname: string; // Assigned by KNRB
	alternative: string; // Created by Crew
	combination: null;
	boat: string; // Boat id
	boattype: string;
	remarks: string | null; // Voor wedstrijdleiding
	public_remarks: string | null; // Voor op hoesnelwasik.nl
	remarks_for_umpire: string | null;
	penalty_reason: string | null;
	correction_factor: number;
	category: string; // Preferred category (this is used)
	calculated_category: string; // Assigned category
	local: boolean; // Of het is gewijzigd lokaal
	payments?: any[];
	fines?: any[];
}

export interface Team {
	id: string;
	crew_id: string;
	regatta_id: string;
	field_id: string;
	result_status: TeamResultStatus;
}

export interface TeamDetail extends Team {
	starting_order: number | null;
	toss_reason: string | null;
	shirt_number: number | null;
	penalty_time: number; // In seconden
	penalty_reason: string;
	deleted: boolean;
	user_set_deleted: boolean;
	equal_time_correction: string;
	results: string[];
	finishTime: number;
}

export enum CrewStatus {
	ENTERED = 1,
	WITHDRAWN_AFTER_LOTTERY_WITHOUT_FINE = 2,
	WITHDRAWN_BEFORE_LOTTERY = 8,
	WITHDRAWN_AFTER_LOTTERY_WITH_FINE = 16,
}

export enum TeamResultStatus {
	NORMAL = 0,
	EXCLUDED = 1,
    DISQUALIFIED = 2,
    OUTSIDE_COMPETITION = 4,
    DNS = 8,
    DNF = 16,
}