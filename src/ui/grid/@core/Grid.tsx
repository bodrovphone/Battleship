import React from 'react';
import styled from 'styled-components';
import times from 'lodash/times';

import { CloneComponent } from '@/business/utils/cloneComponent';

import { GridColumns } from '../components/GridColumns';
import { GridRow } from '../components/GridRow';
import { ALPHABET } from '../const';

const Grid_Styled = styled.div<Props>`
    display: grid;
    grid-template-columns: repeat(${(props) => ++props.size}, auto);
    row-gap: 10px;
    margin: auto;
    width: 70%;
`;

type Props = {
    size: number;
};

const makeObj = (index: number) => ({ order: index, index: index });

export const Grid: React.FC<Props> = ({ size = 10 }) => {
    return (
        <Grid_Styled size={size}>
            <GridColumns length={size} />
            <CloneComponent times={size} indexedProps={times(size, makeObj)}>
                <GridRow length={size} order={size} sideAnnotations={ALPHABET} />
            </CloneComponent>
        </Grid_Styled>
    );
};
