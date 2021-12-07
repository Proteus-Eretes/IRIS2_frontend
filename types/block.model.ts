import { Field } from './event.model';
import { Regatta } from './regatta.model';
import { RoundDetail } from './round.model';

export interface Block {
	id: string;
	regatta_id: string;
	block: number;
	start_date: Date;
	start_time: Date; // Waarom een start time EN een start date als in de start time beide zitten?
	status: number; // Wat betekenen deze statussen?
	actions: Action[];
}

export interface BlockDetail extends Block {
	fields: Field[];
	rounds: RoundDetail[];
	regatta: Regatta;
}

export interface Action {
	link: string;
	id: string;
	icon: string;
	setting: string;
	class: string;
}
