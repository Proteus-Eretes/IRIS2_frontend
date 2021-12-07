export interface Rower {
	id: string;
	regatta_id: string; // Waarom is een roeier gelinkt aan een regatta? Een roeier kan vaker voorkomen, toch? Hetzelfde voor een club?
	club_id: string;
	knrb: string;
	knrb_num: null; // Wat is dit?
	license: number;
	fullName: string;
	initals: string;
	firstname: string;
	middlename: string;
	lastname: string;
	year_of_birth: null;
	gender: string;
	_joinData: JoinData;
}

// Wat is Join Data?
export interface JoinData {
	id: string;
	id_old: number;
	crew_id: string;
	crew_id_old: number;
	rower_id: string;
	rower_id_old: number;
	role: number;
	position: number;
}
