import React from 'react';
import styled from 'styled-components';

const Cell_Styled = styled.div`
    display: flex;
`;

type Props = {
    text?: string;
    empty?: boolean;
};

export const Cell: React.FC<Props> = ({ text = '', empty }) => {
    return <Cell_Styled>{!empty && text}</Cell_Styled>;
};
