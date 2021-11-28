import { Crew } from "./crew.model";

// FIXME wat is een team?
export interface Team {
    id_old:                number;
    crew_id_old:           number;
    starting_order:        number | null;
    toss_reason:           string | null;
    shirt_number:          number | null;
    result_status:         number;
    penalty_time:          number;
    penalty_reason:        string;
    deleted:               boolean;
    field_id_old:          number;
    regatta_id_old:        number;
    user_set_deleted:      boolean;
    crew_id:               string;
    field_id:              string;
    regatta_id:            string;
    id:                    string;
    equal_time_correction: string;
    results:               any[];
    crew:                  Crew;
    finishTime:            number;
}