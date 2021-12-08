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
    padding: 10px 0 4px 0;
    .day-name {
        text-transform: capitalize;
    }
`;

const Today = styled.span`
    color: #5bcb02;
    font-size: 0.8125rem;
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

const OpeningHour = ({ item }: Props) => {
    const today = new Date().getDay();
    const isCurrentDay = getDayByNumber(today) === item.day;
    const { schedule, day } = item;

    return (
        <StyledRow data-testid="opening-hour">
            <div>
                <strong className="day-name">{day}</strong>
                {isCurrentDay && <Today>TODAY</Today>}
            </div>
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
