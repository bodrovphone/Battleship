import React from 'react';
import styled from 'styled-components';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';

import { CloneComponent } from '@/business/utils/cloneComponent';
import { ALPHABET } from '@/shared/const';

import { GridColumns } from '../components/GridColumns';
import { GridRow } from '../components/GridRow';

const Grid_Styled = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(${(props) => ++props.size}, auto);
  row-gap: 10px;
  margin: auto;
`;

type Props = {
  size: number;
};

const makeIndexProps = (index: number) => ({ order: index, key: uniqueId(`${index}-row`) });

export const Grid: React.FC<Props> = ({ size = 10 }) => {
  return (
    <Grid_Styled size={size}>
      <GridColumns length={size} />
      <CloneComponent times={size} indexedProps={times(size, makeIndexProps)}>
        <GridRow length={size} order={size} sideAnnotations={ALPHABET as unknown as string[]} />
      </CloneComponent>
    </Grid_Styled>
  );
};
