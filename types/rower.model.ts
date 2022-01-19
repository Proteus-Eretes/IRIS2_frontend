export interface Rower {
	id: string;
	crew_id: string;
	regatta_id: string;
	club_id: string;
	position: number;
	role: RowerRole;
	knrb: string;
	knrb_num: null; // Oude systeem, veranderen door wedstrijdleiding
	fullName: string;
	gender: Gender | null;
}

export interface RowerDetail extends Rower {
	license: number;
	initals: string;
	firstname: string;
	middlename: string;
	lastname: string;
	year_of_birth: number | null;
}

export enum Gender {
	MAN = 'M',
	WOMAN = 'W',
	MIX = 'X',
}

export function getGenderLabel(gender: Gender | null) {
	switch (gender) {
		case Gender.MAN:
			return 'Man';
		case Gender.WOMAN:
			return 'Woman';
		case Gender.MIX:
			return 'Mix';
		default:
			return '';
	}
}

export enum RowerRole {
	ROWER = 1,
	COX = 2,
	COACH = 3,
}

export function getRowerRoleLabel(role: RowerRole) {
	switch (role) {
		case RowerRole.ROWER:
			return 'Rower';
		case RowerRole.COX:
			return 'Cox';
		case RowerRole.COACH:
			return 'Coach';
		default:
			return '';
	}
}
