// outsource dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// local dependencies
import './assets/styles/index.css';

import { App } from './pages/app';
import { config } from '@/constants';
import { makeServer } from '@/mock-server';
import reportWebVitals from '@/report-web-vitals';

if (!config('PRODUCTION')) {
  makeServer({ environment: config('SID') });
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);

reportWebVitals(({ name, id, delta }) => {
  console.log(`${name} matching ID ${id} changed by ${delta}`);
});

