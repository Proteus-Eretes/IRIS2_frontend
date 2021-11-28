import { Field } from './block.model';
import { Crew, DisplayStatus } from './crew.model';

export interface Event {
	id_old: number;
	regatta_id_old: number;
	event: number;
	day: string;
	cost_id_old: number;
	number: number;
	code: string;
	name: string;
	category: string;
	boat_type: string;
	weighed: boolean;
	sex: string;
	remarks: string;
	status: DisplayStatus;
	parent_old: number;
	block_knrb: null;
	correction_factor_boat: number;
	cost_id: string;
	id: string;
	regatta_id: string;
	parent: null;
	sub_crews?: Crew[];
	crews?: Crew[];
	fields?: Field[];
}
