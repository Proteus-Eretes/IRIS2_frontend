export interface Regatta {
	id: string;
	venue_id: string;
	name: string;
	start_date: Date;
	end_date: Date;
	race_type: RegattaType;
	breaking_news: string;
}

export interface RegattaDetail extends Regatta {
	file: string;
	correction_factor_settings: boolean; // Of het waait of niet
	correction_factor_type: string | null; // id
	lottery_settings: LotterySettings;
}

export interface LotterySettings {
	maximumCrewsType: string;
	baseCrewPercentageOn: string;
	maximumCrewsNumber: number;
	excludeCombinationCrews: number;
	matchingRowersFor8: number;
	matchingRowersFor4: number;
	matchingRowersFor2: number;
	matchingRowersFor1: number;
	previousYearClubsExcludeCombiationCrews: number;
}

export enum RegattaType {
	CHASE = 'chase',
	ALL_ROUND = 'all-around',
}

export function getRegattaTypeLabel(type: RegattaType) {
	switch (type) {
		case RegattaType.CHASE:
			return 'Chase';
		case RegattaType.ALL_ROUND:
			return 'All Round';
	}
}
