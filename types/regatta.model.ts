export interface Regatta {
    id_old:                     number;
    name:                       string;
    file:                       string;
    start_date:                 Date;
    end_date:                   Date;
    race_type:                  string;
    //FIXME waarom is dit een JSON object als string?
    lottery_settings:           LotterySettings;
    breaking_news:              string;
    correction_factor_settings: number;
    venue_id_old:               number;
    id:                         string;
    venue_id:                   string;
    correction_factor_type:     null;
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