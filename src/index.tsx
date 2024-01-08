// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import { NextUIProvider } from '@nextui-org/react';

// local dependencies
import './assets/styles/index.scss';
import { App } from './pages/app.tsx';

import { config } from '@/constants';
import { makeServer } from '@/mock-server';

!config('PRODUCTION') && makeServer({ environment: config('SID') });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);
