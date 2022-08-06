import React from 'react';
import styled from 'styled-components';

const Pane_Styled = styled.div<Props>`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: ${(props) => (props.horizontal ? 'row' : 'column')};
`;

type HorizontalProp = {
    horizontal: boolean;
    vertical?: never;
};

type VerticalProp = {
    vertical: boolean;
    horizontal?: never;
};

type Props = {
    count: number;
    titles: string[];
} & (HorizontalProp | VerticalProp);

export const Pane: React.FC<Props> = (props) => {
    const { count, titles } = props;
    const elements = new Array(count).fill(0).map((_none, index) => <div>{titles[index]}</div>);
    return <Pane_Styled {...props}>{elements}</Pane_Styled>;
};
