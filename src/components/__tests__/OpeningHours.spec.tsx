import { render, screen } from '@testing-library/react';
import React from 'react';
import OpeningHours from '../OpeningHours';

const defaultProps = {
    items: [
        {
            day: 'Saturday',
            schedule: ['9 AM - 11 AM', '4 PM - 11 PM'],
        },
        {
            day: 'saturday',
            schedule: ['9 AM - 11 AM', '4 PM - 11 PM'],
        },
    ],
};

describe('OpeningHours', () => {
    test('it renders', () => {
        const { container } = render(<OpeningHours scheduleInfo={defaultProps.items} />);
        expect(screen.getByText('Opening Hours')).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    test('it should render no opening hours', () => {
        render(<OpeningHours scheduleInfo={[]} />);
        expect(screen.getByText('No available opening hours')).toBeTruthy();
    });

    test('it should render opening hours', () => {
        render(<OpeningHours scheduleInfo={defaultProps.items} />);
        expect(screen.getAllByTestId('opening-hour')).toHaveLength(2);
    });
});
