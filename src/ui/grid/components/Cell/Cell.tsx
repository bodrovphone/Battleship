import React from 'react';
import styled from 'styled-components';

const Cell_Styled = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.blurred ? '0.5' : '1')};
`;

type Props = {
  text?: string;
  empty?: boolean;
  blurred?: boolean;
};

export const Cell: React.FC<Props> = ({ text = '', empty, blurred }) => {
  return <Cell_Styled blurred={blurred}>{!empty && text}</Cell_Styled>;
};
