import { Club } from "./club.model";
import { Event } from "./event.model";
import { Rower } from "./rower.model";

export interface Crew {
    id_old:              number;
    event_id_old:        number;
    club_id_old:         number;
    knrb_num:            number;
    status:              number;
    name:                string;
    shortname:           string;
    alternative:         string;
    sequence:            number;
    combination:         null;
    boat:                string;
    boattype:            string;
    remarks:             null;
    result_status:       null;
    penalty_reason:      null;
    correction_factor:   number;
    category:            string;
    local:               number;
    regatta_id_old:      number;
    sub_event_id_old:    number;
    calculated_category: string;
    remarks_for_umpire:  null;
    knrb_sequence:       number;
    public_remarks:      null;
    club_id:             string;
    id:                  string;
    event_id:            string;
    sub_event_id:        null;
    regatta_id:          string;
    payments:            any[];
    crews_data:          any[];
    fines:               any[];
    coxes:               any[];
    coaches:             any[];
    rowers:              Rower[];
    club:                Club;
    sub_event:           null;
    event:               Event;
    displayName:         string;
    subEventCode:        string;
    displayStatus:       DisplayStatus;
    clubName:            string;
}

export enum DisplayStatus {
    Entered = "Entered",
}