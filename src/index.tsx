// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import { HeroUIProvider } from '@heroui/react';

// local dependencies
import './assets/styles/index.scss';
import { App } from './pages/app.tsx';

import { config } from '@/constants';
import { makeServer } from '@/mock-server';

if (!config('PRODUCTION')) {
  makeServer({ environment: config('SID') });
}

// const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>
);
