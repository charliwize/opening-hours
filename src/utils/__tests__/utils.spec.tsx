import { Schedule } from '../../App';
import { getDayByNumber, getPeriod } from '../utils';

const defaultResponse: Schedule = {
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
    test('it is not closed on same day', () => {
        expect(getPeriod(defaultResponse, 'friday', 0)).toEqual({
            day: 'friday',
            schedule: ['6 PM - 1 AM'],
        });
    });

    test('it returns hours as closed', () => {
        const noItems = {
            friday: [],
        };
        const allClose: Schedule = {
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

    test('it is open and closed on same day', () => {
        const openClose: Schedule = {
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

    test('it throws invalid data error', () => {
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

    test('it returns day name', () => {
        expect(getDayByNumber(1)).toBe('monday');
        expect(getDayByNumber(9)).toBeUndefined();
    });
});
