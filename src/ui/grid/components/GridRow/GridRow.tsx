import React from 'react';
import uniqueId from 'lodash/uniqueId';

import { iterate } from '@/business/utils/iterate';

import { Cell } from '../Cell';

type Props = {
    length: number;
    order: number;
    sideAnnotations?: string[];
};

export const GridRow: React.FC<Props> = ({ length, order, sideAnnotations }) => {
    return (
        <React.Fragment key={uniqueId()}>
            {iterate(length).run((index) => {
                if (index === 0 && sideAnnotations) {
                    return (
                        <React.Fragment key={uniqueId()}>
                            <Cell text={sideAnnotations[order]} />
                            <div>•</div>
                        </React.Fragment>
                    );
                } else {
                    return <div key={uniqueId('cell')}>•</div>;
                }
            })}
        </React.Fragment>
    );
};
