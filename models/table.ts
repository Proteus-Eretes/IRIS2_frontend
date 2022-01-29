export interface TableAction {
    id: string;
    icon: string;
    setting: string;
}

export interface TableHeader {
    id: string;
    sortable: boolean;
    sortId?: string;
}

export enum TableSortDirection {
    UP = 0,
    DOWN = 1
}
