import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useCreateShipsStore } from '@/business/create-ships/hooks';
import { useTargetShipsStore } from '@/business/target-ships/hooks';

const Feedback_Styled = styled.div`
  display: flex;
  padding-left: 30px;
  margin: 10px;
  gap: 10px;
`;

export const Feedback = observer(() => {
  const shipsStore = useCreateShipsStore();
  const targetStore = useTargetShipsStore();

  const isLastShootHit = targetStore.isLastShootHit && 'You hit the ship! Move on to get it sunk.';
  const isLastShootSing = targetStore.isLastShootSink && 'Sunk';
  const isLastShootMiss = targetStore.isLastShootMiss && 'Miss';

  const status = isLastShootSing || isLastShootHit || isLastShootMiss || "Let's play a game!";

  useEffect(() => {
    targetStore.initMapping(shipsStore.normalizedLocation);
  }, [shipsStore.normalizedLocation]);

  return <Feedback_Styled>{status}</Feedback_Styled>;
});
