import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import OpeningHours from './components/OpeningHours';
import TextAreaInput from './components/TextAreaInput';
import { Schedule } from './types';
import { getPeriod } from './utils/utils';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 30rem;
    margin-bottom: 5rem;
    @media (max-width: 600px) {
        width: 80%;
    }
    @media (max-width: 320px) {
        flex-direction: column;
    }
`;

function App() {
    const [scheduleInfo, setScheduleInfo] = useState<
        { day: string; schedule: string[] }[] | undefined
    >(undefined);
    const [jsonInput, setJsonInput] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const prettifyJson = () => {
            try {
                const originalVersion = JSON.parse(jsonInput);
                var prettyVersion = JSON.stringify(originalVersion, undefined, 4);
                setJsonInput(prettyVersion);
            } catch (error) {
                if (error instanceof Error) {
                    setError('Invalid JSON: ' + error.message);
                    return;
                }
            }
        };
        if (jsonInput.length > 0) {
            prettifyJson();
        }
    }, [jsonInput]);

    const getSchedules = () => {
        if (!jsonInput) {
            return;
        }
        try {
            const data: Schedule = JSON.parse(jsonInput);
            const scheduleInfo = Object.keys(data).map((day: string, index: number) =>
                getPeriod(data, day, index)
            );
            setScheduleInfo(scheduleInfo);
        } catch (error) {
            setScheduleInfo([]);
            if (error instanceof Error) {
                setError('Invalid data: ' + error.message);
                return;
            }
            if (typeof error === 'string') {
                setError(error);
            }
        }
    };

    const handleEnterData = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setError('');
        setScheduleInfo(undefined);
        setJsonInput(e.target.value);
    };

    return (
        <Container>
            <Wrapper>
                <TextAreaInput
                    handleEnterData={handleEnterData}
                    value={jsonInput}
                    error={error}
                    getSchedules={getSchedules}
                />
                {scheduleInfo && jsonInput.length > 0 && error.length === 0 && (
                    <OpeningHours scheduleInfo={scheduleInfo} />
                )}
            </Wrapper>
        </Container>
    );
}

export default App;
