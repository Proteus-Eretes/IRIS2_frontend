export interface Rower {
	id_old: number;
	club_id_old: number;
	knrb: string;
	initals: string;
	firstname: string;
	middlename: string;
	lastname: string;
	year_of_birth: null;
	gender: string;
	license: number;
	knrb_num: null;
	regatta_id_old: number;
	club_id: string;
	regatta_id: string;
	id: string;
	_joinData: JoinData;
	fullName: string;
}

export interface JoinData {
	id_old: number;
	crew_id_old: number;
	rower_id_old: number;
	role: number;
	position: number;
	id: string;
	crew_id: string;
	rower_id: string;
}
