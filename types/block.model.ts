import { Field } from './event.model';
import { Regatta } from './regatta.model';
import { RoundDetail } from './round.model';

export interface Block {
	id: string;
	regatta_id: string;
	block: number;
	start_time: Date;
	status: BlockStatus;
}

export interface BlockDetail extends Block {
	fields: Field[];
	rounds: RoundDetail[];
	regatta: Regatta;
}

export interface BlockAction {
	link: string;
	id: string;
	icon: string;
	setting: string;
	class: string;
}

// TODO In apart bestand?
export enum BlockStatus {
	CREATED = 1,
	ROUNDS_ASSIGNED = 2,
	EVENTS_ASSIGNED = 4,
	START_ORDER = 8,
	TOSSED = 16,
	SHIRT_NUMBERS_ASSIGNED = 32,
}
