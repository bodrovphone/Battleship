import React from 'react';

import { NUMERIC } from '@/shared/const';

import { Cell } from '../Cell';

type Props = {
  length: number;
  annotations?: string[];
};

export const GridColumns: React.FC<Props> = ({ length, annotations = NUMERIC }) => {
  return (
    <React.Fragment>
      <Cell empty />
      {annotations.map((letter, index) => {
        if (index >= length) {
          return;
        }
        return <Cell blurred key={letter} text={letter} />;
      })}
    </React.Fragment>
  );
};
