export interface Rower {
	id: string;
	regatta_id: string;
	club_id: string;
	knrb: string;
	knrb_num: null; // Is dit hetzelfde als 'knrb'?
	license: number;
	fullName: string;
	initals: string;
	firstname: string;
	middlename: string;
	lastname: string;
	year_of_birth: null;
	gender: string;
	_joinData: JoinData; // Wat is JoinData?
}

// Wat is Join Data?
export interface JoinData {
	id: string;
	crew_id: string;
	rower_id: string;
	role: number;
	position: number;
}
