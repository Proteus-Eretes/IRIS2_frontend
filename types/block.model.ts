import { Event } from "./event.model";
import { Regatta } from "./regatta.model";
import { Round } from "./round.model";
import { Team } from "./team.model";

export interface Block {
    id_old:         number;
    regatta_id_old: number;
    block:          number;
    start_date:     string;
    start_time:     string;
    status:         number;
    id:             string;
    regatta_id:     string;
    fields:         Field[];
    rounds:         Round[];
    regatta:        Regatta;
    actions:        Action[];
}

export interface Action {
    link:    string;
    id:      string;
    icon:    string;
    setting: string;
    class:   string;
}

export interface Field {
    id_old:         number;
    block_id_old:   number;
    event_id_old:   number;
    starting_order: null;
    result_status:  number;
    round_id_old:   number;
    start_time:     null;
    regatta_id_old: number;
    block_id:       string;
    event_id:       string;
    id:             string;
    regatta_id:     string;
    round_id:       string;
    round:          Round;
    teams:          Team[];
    event:          Event;
}

export enum DisplayStatus {
    Entered = "Entered",
}
