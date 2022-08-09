import React from 'react';
import styled from 'styled-components';

const LayoutWrapper_Styled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
  height: 100vh;
`;

const InnerContainer_Styled = styled.div`
  width: 50%;
  max-width: 600px;
  height: 50%;
  max-height: 600px;
  margin: auto;
`;

type Props = {
  children: React.ReactNode;
};

export const LayoutWrapper: React.FC<Props> = ({ children }) => {
  return (
    <LayoutWrapper_Styled>
      <InnerContainer_Styled>{children}</InnerContainer_Styled>
    </LayoutWrapper_Styled>
  );
};
