import React from 'react';

import { Main } from '@/ui/main/@core';
import { GlobalStyle } from '@/styles/global';

const App: React.FC = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <Main />
        </React.Fragment>
    );
};

export default App;
