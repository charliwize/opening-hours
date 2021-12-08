import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import TextAreaInput from '../TextAreaInput';

const defaultProps = {
    value: 'dummy_json',
    handleEnterData: jest.fn(),
    getSchedules: jest.fn(),
    error: 'string',
};

describe('TextAreaInput', () => {
    test('it renders', () => {
        const { container } = render(
            <TextAreaInput
                handleEnterData={defaultProps.handleEnterData}
                getSchedules={defaultProps.getSchedules}
                value={defaultProps.value}
            />
        );
        expect(
            screen.getByLabelText(
                /paste JSON below, click 'GET SCHEDULE' to view updated opening hours/
            )
        ).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    test('it enables button on textarea changed', () => {
        render(
            <TextAreaInput
                handleEnterData={defaultProps.handleEnterData}
                getSchedules={defaultProps.getSchedules}
                value=""
            />
        );
        const input = screen.getByLabelText(
            /paste JSON below, click 'GET SCHEDULE' to view updated opening hours/
        );
        expect(screen.queryAllByRole('button')[0]).toBeDisabled();
        fireEvent.change(input, { target: { value: 123 } });
        waitFor(() => {
            expect(screen.getByRole('button')).toBeEnabled();
        });
    });

    test('it gets schedules on button clicked', async () => {
        render(
            <TextAreaInput
                handleEnterData={defaultProps.handleEnterData}
                getSchedules={defaultProps.getSchedules}
                value="123"
            />
        );
        const button = screen.queryAllByRole('button')[0];
        expect(button).toBeEnabled();
        fireEvent.click(button);
        expect(defaultProps.getSchedules).toHaveBeenCalledTimes(1);
    });
});
