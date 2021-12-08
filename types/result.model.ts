export interface Result {
	id: string;
	round_id: string;
	team_id: string;
	location_id: string;
	deviation: number; // Is dit seconden?
	pulses: null; // Is dit niet hetzelfde als 'times'?
	status: number;
	location: Location;
	time: string; // Waarom worden hier ineens UNIX gegeven?
	times: Time[];
}

export interface Time {
	id: string;
    // Waarom worden hier ook nog eens de ids gegeven?
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
	status: string;
	stopwatch: string; // Wat is dit?
}

export interface Location {
	id: string;
	regatta_id: string;
	name: string;
	distance: number;
	type: string;
	waypoint: boolean;
}