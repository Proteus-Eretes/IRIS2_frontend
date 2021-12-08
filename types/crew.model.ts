import { Club } from './club.model';
import { Event } from './event.model';
import { Result } from './result.model';
import { Rower } from './rower.model';

export interface Crew {
	id: string;
	club_id: string;
	regatta_id: string;
	event_id: string;
	sub_event_id: string | null; // Als er te weinig ploegen zijn voor een eigen veld
	subEventCode: string;
	knrb_num: number;
	knrb_sequence: number; // Aangewezen door KNRB
	sequence: number; // Van wedstrijdleiding
	status: CrewStatus;
	result_status: TeamResultStatus;
	clubName: string;
	displayName: string; // Preferred display name
	name: string;
	shortname: string; // Assigned by KNRB
	alternative: string; // Created by Crew
	combination: null;
	boat: string; // Boat number
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
	coxes?: any[]; // Kan dit niet samen met 'rowers' omdat het enige verschil de rol is?
	coaches?: any[];
	displayStatus: CrewStatus;
	rowers?: Rower[];
	club?: Club;
	event?: Event;
	sub_event?: null; // Wat is het verschil tussen 'sub_evetn' en 'event'?
}

export interface Team {
	id: string;
	crew_id: string;
	regatta_id: string;
	field_id: string;
	starting_order: number | null;
	crew: Crew;
	toss_reason: string | null;
	shirt_number: number | null;
	penalty_time: number; // In seconden
	penalty_reason: string;
	deleted: boolean;
	user_set_deleted: boolean;
	equal_time_correction: string;
	results: Result[];
	result_status: TeamResultStatus;
	finishTime: number;
}

export enum CrewStatus {
	ENTERED = 1,
	WITHDRAWN_AFTER_LOTTERY_WITHOUT_FINE = 2,
	WITHDRAWN_BEFORE_LOTTERY = 8,
	WITHDRAWN_AFTER_LOTTERY_WITH_FINE = 16,
}

export enum TeamResultStatus {
	EXCLUDED = 1,
    DISQUALIFIED = 2,
    OUTSIDE_COMPETITION = 4,
    DNS = 8,
    DNF = 16,
}