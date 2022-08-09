import React from 'react';

import { Grid } from '@/ui/grid/@core/Grid';
import { Input } from '@/ui/input/@core';
import { Feedback } from '@/ui/feedback/@core';
import ErrorBoundary from '@/ui/error/@core/ErrorBoundary';

import { LayoutWrapper } from '../layouts/LayoutWrapper';

export const Main: React.FC = () => {
  return (
    <ErrorBoundary>
      <LayoutWrapper>
        <Feedback />
        <Grid size={10} />
        <Input />
      </LayoutWrapper>
    </ErrorBoundary>
  );
};
