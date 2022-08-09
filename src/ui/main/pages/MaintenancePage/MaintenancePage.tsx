import React from 'react';
import styled from 'styled-components';

const MaintenancePage_Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MaintenancePage = () => {
  return (
    <MaintenancePage_Styled>
      Oops. I'm already looking into this issue and fix it shortly. Can you reload the page and try again, please?
    </MaintenancePage_Styled>
  );
};
