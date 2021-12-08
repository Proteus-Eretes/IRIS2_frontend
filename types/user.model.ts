export interface User {
	id: string;
	username: string;
	name: string;
	emailadres: string;
	mobile: string;
	role: Role;
	last_login: Date;
}

export enum Role {
	ADMIN = 3,
	REGATTA_OWNER = 2,
	REGATTA_USER = 1,
}
