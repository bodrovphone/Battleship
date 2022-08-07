import isNumber from 'lodash/isNumber';
import React from 'react';
import uniqueId from 'lodash/uniqueId';

import { iterate } from './iterate';

type Props = {
    times: number;
    indexedProps?: Record<string, any>[];
    children: React.ReactElement<any>;
};

export const CloneComponent: React.FC<Props> = ({ times, children, indexedProps = [] }) => {
    if (!isNumber(times)) {
        throw new Error(`makeElements received ${typeof times}`);
    }
    return (
        <React.Fragment key={uniqueId('cloned')}>
            {iterate(times).run((index) => React.cloneElement(children, { ...indexedProps[index] }))}
        </React.Fragment>
    );
};
