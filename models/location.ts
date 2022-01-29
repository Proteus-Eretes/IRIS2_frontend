export interface Location {
    id: string;
    regatta_id: string;
    round_id: string;
    name: string;
    distance: number;
    type: LocationType;
    waypoint: boolean;
}

export enum LocationType {
    START = 'Start',
    CLOCKING_LOCATION = 'Clocking location',
    FINISH = 'Finish'
}

export function getLocationTypeLabel(type: LocationType) {
    switch (type) {
        case LocationType.START:
            return 'Start';
        case LocationType.CLOCKING_LOCATION:
            return 'Clocking location';
        case LocationType.FINISH:
            return 'Finish';
    }
}
