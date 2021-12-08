import { render, screen } from '@testing-library/react';
import React from 'react';
import OpeningHour from '../OpeningHour';

const defaultProps = {
    item: {
        day: 'Saturday',
        schedule: ['9 AM - 11 AM', '4 PM - 11 PM'],
    },
};

describe('OpeningHour', () => {
    test('it renders', () => {
        const { container } = render(<OpeningHour item={defaultProps.item} />);
        expect(container).toMatchSnapshot();
    });

    test('it opening and closing times', () => {
        render(<OpeningHour item={defaultProps.item} />);
        expect(screen.getByText('9 AM - 11 AM')).toBeTruthy();
        expect(screen.getByText('4 PM - 11 PM')).toBeTruthy();
    });

    test('it renders closed text', () => {
        const props = {
            item: {
                day: 'Friday',
                schedule: ['Closed'],
            },
        };
        render(<OpeningHour item={props.item} />);
        expect(screen.getByText('Closed')).toBeTruthy();
    });
});
