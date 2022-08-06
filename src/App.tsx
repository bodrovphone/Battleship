import React from 'react';

import { MainLayout } from '@/ui/main/@core';
import { GlobalStyle } from '@/styles/global';

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <MainLayout />
        </>
    );
};

export default App;
