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
	Admin = 'admin',
	RegattaOwner = 'regatta_owner',
	RegattaUser = 'regatta_user',
}
