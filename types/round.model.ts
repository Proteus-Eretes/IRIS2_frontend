export interface Round {
    id_old:         number;
    name:           string;
    multiplier:     number;
    regatta_id_old: number;
    regatta_id:     string;
    id:             string;
    _joinData?:     JoinData;
}

export interface JoinData {
    id_old:       number;
    round_id_old: number;
    block_id_old: number;
    block_id:     string;
    id:           string;
    round_id:     string;
    sort:         number;
}