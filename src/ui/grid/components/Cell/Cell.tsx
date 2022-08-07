import React from 'react';
import styled from 'styled-components';

const Cell_Styled = styled.div`
    display: flex;
`;

type Props = {
    text?: string;
    empty?: boolean;
    key?: string;
};

export const Cell: React.FC<Props> = ({ text = '', empty, key }) => {
    return <Cell_Styled key={key}>{!empty && text}</Cell_Styled>;
};
