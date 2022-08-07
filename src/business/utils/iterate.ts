import React from 'react';

export const iterate = (size: number) => ({
    run: (cb: (idx: number) => React.ReactNode) => [...Array(size)].map((_none, index) => cb(index))
});
