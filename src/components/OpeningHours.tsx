import styled from 'styled-components';
import OpeningHour from './OpeningHour';

interface Props {
    scheduleInfo: { day: string; schedule: string[] }[];
}

const Times = styled.div`
    padding: 1.5rem;
    margin-top: 2.5rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;

    .spinner-border {
        display: flex;
        margin: 1.5rem auto;
    }
`;

const Header = styled.div`
    border-bottom: 1.5px solid #202125;
    padding-bottom: 1rem;
    display: flex;
    h2 {
        margin: 0;
        font-weight: bold;
    }
    img {
        width: 18px;
        margin-right: 0.5rem;
    }
`;

const EmptyState = styled.div`
    margin-top: 1.5rem;
`;

const WeekSchedule = ({ scheduleInfo }: Props): React.ReactElement => {
    if (!Boolean(scheduleInfo.length)) {
        return <EmptyState>No available opening hours</EmptyState>;
    }

    return (
        <>
            {scheduleInfo.map((item, index) => {
                return <OpeningHour item={item} key={index} />;
            })}
        </>
    );
};

const OpeningHours = ({ scheduleInfo }: Props) => {
    return (
        <Times>
            <Header>
                <img src="/assets/clock-svgrepo-com.svg" alt="clock" />
                <h2>Opening Hours</h2>
            </Header>
            <WeekSchedule scheduleInfo={scheduleInfo} />
        </Times>
    );
};

export default OpeningHours;
