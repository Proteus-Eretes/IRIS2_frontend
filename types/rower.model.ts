export interface Rower {
	id: string;
	regatta_id: string;
	club_id: string;
	knrb: string;
	knrb_num: null; // Old system
	license: number;
	fullName: string;
	initals: string;
	firstname: string;
	middlename: string;
	lastname: string;
	year_of_birth: null;
	gender: Gender | null;
	_joinData: JoinData; // Wat is JoinData?
}

// Wat is Join Data?
export interface JoinData {
	id: string;
	crew_id: string;
	rower_id: string;
	role: RowerRole;
	position: number;
}

export enum Gender {
	MAN = 'M',
	WOMEN = 'W',
	MIX = 'X',
}

export enum RowerRole {
	ROWER = 1,
    COX = 2,
    COACH = 3,
}