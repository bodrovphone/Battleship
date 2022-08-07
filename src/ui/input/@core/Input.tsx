import React, { useState } from 'react';
import styled from 'styled-components';

const Input_Styled = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 10px;
    label {
    }

    input {
    }
`;

export const Input: React.FC = () => {
    const [value, setValue] = useState('');

    const validateInput = (value: string) => {
        switch (value.length) {
            case 0:
                return true;
            case 1:
            case 2:
            case 3:
                return /[a-jA-J]{1}([1-9]|10){0,1}$/.test(value);
            default:
                return false;
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInput(e.target.value) && setValue(e.target.value.toUpperCase());
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            // makeShoot();
        }
    };

    return (
        <Input_Styled>
            <label htmlFor="turn">Enter coordinates (row, col), e.g. A5: </label>
            <input id="shut" value={value} onChange={onChange} onKeyDown={onKeyDown} type="text" />
        </Input_Styled>
    );
};
