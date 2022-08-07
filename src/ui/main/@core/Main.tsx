import React from 'react';

import { Grid } from '@/ui/grid/@core/Grid';
import { Input } from '@/ui/input/@core';

import { LayoutWrapper } from '../layouts/LayoutWrapper';

export const Main: React.FC = () => {
    return (
        <LayoutWrapper>
            <Grid size={10} />
            <Input />
        </LayoutWrapper>
    );
};
