import React from 'react';

import { Cell } from '../Cell';
import { NUMERIC } from '../../const';

type Props = {
    length: number;
    annotations?: string[];
};

export const GridColumns: React.FC<Props> = ({ length, annotations = NUMERIC }) => {
    return (
        <>
            <Cell empty />
            {annotations.map((letter, index) => {
                if (index >= length) {
                    return;
                }
                return <Cell key={letter} text={letter} />;
            })}
        </>
    );
};
