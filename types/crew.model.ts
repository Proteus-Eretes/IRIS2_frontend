import { Club } from './club.model';
import { DisplayStatus } from './display-status.model';
import { Event } from './event.model';
import { Result } from './result.model';
import { Rower } from './rower.model';

export interface Crew {
	id: string;
	event_id: string;
	club_id: string;
	regatta_id: string;
	sub_event?: null;
	sub_event_id: null; // Wat is een sub_event?
	subEventCode: string;
	knrb_num: number;
	knrb_sequence: number; // Wat is de sequence?
	status: number;
	result_status: null;
	clubName: string; // Waarom wordt hier ook nog de club naam apart gegeven?
	displayName: string; // Wat is het verschil tussen displayName en name?
	name: string;
	shortname: string;
	alternative: string;
	sequence: number;
	combination: null;
	boat: string; // Wat is boat en boattype?
	boattype: string;
	remarks: null;
	remarks_for_umpire: null;
	penalty_reason: null;
	correction_factor: number;
	category: string;
	calculated_category: string;
	local: number; // Wat is dit?
	public_remarks: null;
	payments?: any[];
	crews_data?: any[]; // Wat is dit?
	fines?: any[];
	coxes?: any[]; // Kunnen dit niet gewoon Rowers zijn met aparte rol?
	coaches?: any[];
	displayStatus: DisplayStatus;
	rowers?: Rower[];
	club?: Club;
	event?: Event;
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
	penalty_time: number; // Is dit in seconden?
	penalty_reason: string;
	deleted: boolean;
	user_set_deleted: boolean; // Wat is het verschil met deleted?
	equal_time_correction: string;
	results: Result[]; // Hoe ziet een result er uit?
	result_status: number;
	finishTime: number;
}
