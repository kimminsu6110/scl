import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme, lightTheme } from './theme';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </div>
);
