import React from 'react';
import styled from 'styled-components';
import { getDayByNumber } from '../utils/utils';

interface Props {
    item: { day: string; schedule: string[] };
}

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    line-height: 2.5rem;
    .day-name {
        text-transform: capitalize;
        font-weight: 600;
        font-size: 1rem;
    }
`;

const Today = styled.span`
    color: #5bcb02;
    font-size: 0.75rem;
    margin-left: 0.625rem;
    font-weight: bold;
`;

const Schedule = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .closed-text {
        color: #a1a2a4;
    }
    div {
        align-self: self-end;
    }
`;

const WeekName = styled.div`
    display: flex;
    @media (max-width: 320px) {
        flex-direction: column;
    }
`;

const OpeningHour = ({ item }: Props) => {
    const today = new Date().getDay();
    const isCurrentDay = getDayByNumber(today) === item.day.toLocaleLowerCase();
    const { schedule, day } = item;

    return (
        <StyledRow data-testid="opening-hour">
            <WeekName>
                <div className="day-name">{day}</div>
                {isCurrentDay && <Today>TODAY</Today>}
            </WeekName>
            <Schedule>
                {schedule.map((scheduleItem, index: number) => (
                    <div className={scheduleItem === 'Closed' ? 'closed-text' : ''} key={index}>
                        {scheduleItem}
                    </div>
                ))}
            </Schedule>
        </StyledRow>
    );
};

export default OpeningHour;
