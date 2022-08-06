import React from 'react';
import styled from 'styled-components';

const LayoutWrapperStyled = styled.div`
    display: flex;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
    background-color: white;
    height: 100vh;
`;

type Props = {
    children: React.ReactNode;
};

export const LayoutWrapper: React.FC<Props> = ({ children }) => {
    return <LayoutWrapperStyled>{children}</LayoutWrapperStyled>;
};
