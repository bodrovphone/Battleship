import React, { useState } from 'react';
import { useTargetShipsStore } from '@/business/target-ships/hooks';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { GameOver } from '../components/GameOver';

const Input_Styled = styled.div`
  display: flex;
  margin: 30px;
  gap: 10px;
`;

export const Input: React.FC = observer(() => {
  const targetShipsStore = useTargetShipsStore();
  const [value, setValue] = useState('');

  const validateInput = (value: string) => {
    switch (value.length) {
      case 0:
        return true;
      case 1:
        return /([a-jA-J]|S)/.test(value);
      case 2:
      case 3:
        return /[A-J]([1-9]|10){1}$/.test(value) || value.startsWith('SH');
      default:
        return value === 'SHOW';
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const upperCaseValue = e.target.value.toUpperCase();
    validateInput(upperCaseValue) && setValue(upperCaseValue);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      targetShipsStore.makeShootAndRecordStatus(value);
    }
  };

  const onSubmit = () => {
    targetShipsStore.makeShootAndRecordStatus(value);
  };

  if (!targetShipsStore.gameOver) {
    return (
      <Input_Styled>
        <label htmlFor="turn">Enter coordinates (row, col), e.g. A5: </label>
        <input id="shut" value={value} onChange={onChange} onKeyDown={onKeyDown} type="text" />
        <button type="submit" onClick={onSubmit}>
          shoot
        </button>
      </Input_Styled>
    );
  } else {
    return <GameOver />;
  }
});
