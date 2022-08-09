import React from 'react';
import uniqueId from 'lodash/uniqueId';

import { iterate } from '@/business/utils/iterate';

import { Cell } from '../Cell';
import { TargetCell } from '../TargetCell';

type Props = {
  length: number;
  order: number;
  sideAnnotations: string[];
};

export const GridRow: React.FC<Props> = ({ length, order, sideAnnotations }) => {
  return (
    <React.Fragment key={uniqueId()}>
      {iterate(length).run((index) => {
        const address = sideAnnotations[order] + String(index + 1);

        if (index === 0) {
          return (
            <React.Fragment key={uniqueId()}>
              <Cell blurred text={sideAnnotations[order]} />
              <TargetCell address={address} />
            </React.Fragment>
          );
        } else {
          return <TargetCell key={uniqueId('cell')} address={address} />;
        }
      })}
    </React.Fragment>
  );
};
