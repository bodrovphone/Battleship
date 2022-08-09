import { useTargetShipsStore } from '@/business/target-ships/hooks';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

const GameOver_Styled = styled.div`
  display: flex;
  margin: 30px;
  gap: 10px;
`;

export const GameOver = observer(() => {
  const store = useTargetShipsStore();
  return <GameOver_Styled>{`Well done! You completed the game in ${store.shots.length} shots`}</GameOver_Styled>;
});
