import { Field } from './event.model';
import { Regatta } from './regatta.model';
import { RoundDetail } from './round.model';

export interface Block {
	id: string; // Zijn alle '_oud' ids nog nodig?
	regatta_id: string;
	block: number;
	start_time: Date;
	status: number; // Wat zijn de waarden van deze statussen?
	actions: Action[]; // Kan dit in de frontend?
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
