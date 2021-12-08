export interface Club {
	id: string;
	regatta_id: string;
	knrb_num: number;
	code: string;
	name: string;
	federation: string;
	blade: string;
	shirt: string;
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
	fax: string | null;
	email: string | null;
}