export interface Location {
	id: string;
	regatta_id: string;
	name: string;
	distance: number;
	type: LocationType;
	waypoint: boolean;
}

export enum LocationType {
	START = 'Start',
	CLOCKING_LOCATION = 'Clocking location',
	FINISH = 'Finish',
}
