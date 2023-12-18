import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import router from '@/router';

import muiTheme from '@/mui/mui-reset';

import {
  AppContext,
  AppContextProvider,
} from '@/shared/context/AppContextProvider';

const App = () => {
  const { value } = AppContext();

  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <AppContextProvider.Provider value={value}>
            <CssBaseline />
            <RouterProvider router={router} />
          </AppContextProvider.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};

export default App;
