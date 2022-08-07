import isNumber from 'lodash/isNumber';
import React from 'react';
import { iterate } from './iterate';

type Props = {
    times: number;
    indexedProps?: (Record<string, any> & { index: unknown })[];
    children: React.ReactElement<any>;
};

export const CloneComponent: React.FC<Props> = ({ times, children, indexedProps = [] }) => {
    if (!isNumber(times)) {
        throw new Error(`makeElements received ${typeof times}`);
    }
    return <>{iterate(times).run((index) => React.cloneElement(children, { ...indexedProps[index] }))}</>;
};
