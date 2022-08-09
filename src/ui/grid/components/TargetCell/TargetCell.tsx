import React from 'react';
import { observer } from 'mobx-react-lite';

import { useCreateShipsStore } from '@/business/create-ships/hooks';

import { Cell } from '../Cell';
import { useTargetShipsStore } from '@/business/target-ships/hooks';

type Props = {
  address: string;
};

export const TargetCell: React.FC<Props> = observer(({ address }) => {
  const shipsStore = useCreateShipsStore();
  const targetStore = useTargetShipsStore();
  const shipsLocation = shipsStore.shipsLocation;
  const shots = targetStore.normalizedShort;

  let text = '•';
  if (!!shipsLocation[address] || !!shots[address]) {
    if (shipsLocation[address] === shots[address]) {
      text = '✗';
    } else if (!!shots[address]) {
      text = '➖';
    }
  }

  if (targetStore.debugMode) {
    text = shipsLocation[address] ? 'X' : '';
  }

  return <Cell text={text} />;
});
