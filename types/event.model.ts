import { Crew, Team } from './crew.model';
import { DisplayStatus } from './display-status.model';
import { Round } from './round.model';

export interface Event {
	id: string;
	regatta_id: string;
	cost_id: string;
	parent: null; // Wat is de parent?
	sub_crews?: Crew[]; // Wat is het verschil tussen sub_crews en crews?
	crews?: Crew[];
	fields?: Field[];
	event: number;
	day: Date; // Wordt een event op alleen een dag gedaan? Is dat anders dan de regatta?
	number: number; // Is dit hetzelfde als event?
	code: string; 
	name: string; // Is dit hetzelfde als name?
	remarks: string;
	status: DisplayStatus; // Wat zijn de verschillende statussen?
	category: string;
	block_knrb: null; // Wat is dit?
	boat_type: string;
	weighed: boolean;
	sex: string;
	correction_factor_boat: number;
}

export interface Field {
	id: string;
	block_id: string;
	event_id: string;
	regatta_id: string;
	round_id: string;
	starting_order: number | null;
	result_status: number; // Wat zijn de statussen?
	start_time: null; // Kan dit niet ook op verschillende dagen zijn?
	round?: Round;
	teams?: Team[];
	event?: Event;
}