
export interface Schedule {
    [name: string]: DayItem[];
}

export interface DayItem {
    type: 'open' | 'close';
    value: number;
}
