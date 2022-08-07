import React from 'react';
import { Cell } from '../Cell';
import { iterate } from '@/business/utils/iterate';

type Props = {
    length: number;
    order: number;
    sideAnnotations?: string[];
};

export const GridRow: React.FC<Props> = ({ length, order, sideAnnotations }) => {
    return (
        <>
            {iterate(length).run((index) => {
                if (index === 0 && sideAnnotations) {
                    return (
                        <>
                            <Cell key={sideAnnotations[order]} text={sideAnnotations[order]} />
                            <div>X</div>
                        </>
                    );
                } else {
                    return <div key={new Date().toDateString()}>X</div>;
                }
            })}
        </>
    );
};
