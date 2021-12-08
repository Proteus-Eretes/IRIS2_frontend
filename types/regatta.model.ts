export interface Regatta {
	id: string;
	venue_id: string;
	name: string;
	file: string;
	start_date: Date;
	end_date: Date;
	race_type: string;
	breaking_news: string;
	correction_factor_settings: number; // Is dit een object?
	correction_factor_type: null; // Wat is dit?
	// Waarom is dit een JSON object als string?
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