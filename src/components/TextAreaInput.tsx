import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
    value: string;
    handleEnterData: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    getSchedules: () => void;
    error?: string;
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding-bottom: 1.5rem;
    width: 100%;
    textarea {
        padding: 1.5rem;
        border: 1.5px solid #202125;
    }
    h1 {
        border: 0;
        clip: rect(1px 1px 1px 1px);
        clip; rect(1px, 1px, 1px, 1px);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px; 
    }
    label {
        color: #A1A2A4;
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
    }
`;

const ErrorText = styled.div`
    width: fit-content;
    color: red;
    font-weight: bold;
`;

const StyledButton = styled.button`
    margin-top: 1rem;
    display: flex;
    width: fit-content;
    min-width: 180px;
    background: #202125;
    justify-content: center;
    color: #fff;
    border: 0;
    padding: 0.5rem;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    @media (max-width: 320px) {
        width: 100%;
    }
    :hover {
        color: #A1A2A4;
    }
    :disabled {
        background: #EEEEEE;
        color: #A1A2A4;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TextAreaInput = ({ value, error, handleEnterData, getSchedules }: Props) => {
    return (
        <StyledForm onSubmit={(e) => e.preventDefault()}>
            <h1>Insert JSON Here</h1>
            <label htmlFor="json-input-textarea">
                paste JSON below, click 'GET SCHEDULE' to view updated opening hours
            </label>
            <textarea
                name="text-area"
                id="json-input-textarea"
                value={value}
                onChange={handleEnterData}
                rows={20}
            />
            <ButtonContainer>
                <StyledButton
                    type="submit"
                    onClick={getSchedules}
                    disabled={!!error || value.length === 0}
                >
                    <span>Get Schedule</span>
                </StyledButton>
            </ButtonContainer>
            {error && <ErrorText>{error}</ErrorText>}
        </StyledForm>
    );
};

export default TextAreaInput;
