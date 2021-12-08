import { Block } from './block.model';
import { Field } from './event.model';
import { Location } from './location.model';

export interface Round {
	id: string;
	regatta_id: string;
	name: string;
	multiplier: number; // Used in calculations
}

export interface RoundDetail extends Round {
	fields: Field[];
	locations: Location[];
	blocks: Block[];
}