import { Block, Field } from './block.model';

export interface Round {
	id_old: number;
	name: string;
	multiplier: number;
	regatta_id_old: number;
	regatta_id: string;
	id: string;
}

export interface RoundDetail extends Round {
	fields: Field[];
	locations: Location[];
	blocks: Block[];
}

export interface Location {
	id_old: number;
	name: string;
	regatta_id_old: number;
	distance: number;
	type: string;
	id: string;
	regatta_id: string;
	waypoint: boolean;
}
