import { Schedule } from '../../types';
import { getDayByNumber, getHours, getPeriod } from '../utils';

const defaultResponse: Schedule = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [
        {
            type: 'open',
            value: 64800,
        },
    ],
    saturday: [
        {
            type: 'close',
            value: 3600,
        },
        {
            type: 'open',
            value: 32400,
        },
        {
            type: 'close',
            value: 39600,
        },
        {
            type: 'open',
            value: 57600,
        },
        {
            type: 'close',
            value: 82800,
        },
    ],
};

describe('utils', () => {
    test('it should be closed on the next day', () => {
        expect(getPeriod(defaultResponse, 'friday', 5)).toEqual({
            day: 'friday',
            schedule: ['6 PM - 1 AM'],
        });
    });

    test('it should return hours as closed', () => {
        const noItems = {
            ...defaultResponse,
            friday: [],
        };
        const allClose: Schedule = {
            ...defaultResponse,
            friday: [
                {
                    type: 'close',
                    value: 64800,
                },
            ],
        };
        expect(getPeriod(allClose, 'friday', 0)).toEqual({ day: 'friday', schedule: ['Closed'] });
        expect(getPeriod(noItems, 'friday', 0)).toEqual({ day: 'friday', schedule: ['Closed'] });
    });

    test('it should show open and closed on same day', () => {
        const openClose: Schedule = {
            ...defaultResponse,
            saturday: [
                {
                    type: 'open',
                    value: 32400,
                },
                {
                    type: 'close',
                    value: 39600,
                },
                {
                    type: 'open',
                    value: 57600,
                },
                {
                    type: 'close',
                    value: 82800,
                },
            ],
        };
        expect(getPeriod(openClose, 'saturday', 0)).toEqual({
            day: 'saturday',
            schedule: ['9 AM - 11 AM', '4 PM - 11 PM'],
        });
    });

    test('it should throw invalid data error', () => {
        expect(() =>
            getPeriod(
                {
                    saturdayy: [
                        {
                            type: 'open',
                            value: 32400,
                        },
                    ],
                },
                'saturday',
                0
            )
        ).toThrowError('check data input');
    });

    test('it should return day name', () => {
        expect(getDayByNumber(1)).toBe('monday');
        expect(getDayByNumber(9)).toBeUndefined();
    });

    test('it should return valid time stamp', () => {
        expect(getHours(64800)).toBe('6 PM');
    });

    test('it should throw error on invalid time stamp', () => {
        expect(() => getHours(undefined)).toThrowError('data contains invalid timestamps');
    });
});
