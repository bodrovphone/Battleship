import React from 'react';

import { Grid } from '@/ui/grid/@core/Grid';

import { LayoutWrapper } from '../layouts/LayoutWrapper';

export const MainLayout: React.FC = () => {
    return (
        <LayoutWrapper>
            <Grid size={10} />
        </LayoutWrapper>
    );
};
