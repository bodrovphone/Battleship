import React from 'react';
import styled from 'styled-components';

import { Cell } from '../components/Cell';
import { Pane } from '../components/Pane';

const Grid_Styled = styled.div`
    margin: auto;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
`;

export const Grid: React.FC = () => {
    return (
        <>
            <Pane horizontal titles={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} count={10} />
            <Grid_Styled>
                {new Array(100).fill(0).map((_zero, index) => (
                    <Cell key={index} />
                ))}
            </Grid_Styled>
        </>
    );
};
