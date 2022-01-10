export interface Club {
	id: string;
	regatta_id: string;
	code: string;
	name: string;
	shirt: string;
}

export interface ClubDetail extends Club {
	knrb_num: number;
	federation: string;
	blade: string;
	trousers: string;
	contact: Contact;
	emergency: Contact;
	address: string;
	city: string;
}

// Dit is denk ik handiger
export interface Contact {
	name: string;
	mobile: string;
	phone: string;
	fax?: string | null;
	email?: string | null;
}