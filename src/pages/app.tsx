// outsource dependencies
import useVH from 'react-vh';
import { memo, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';


// local dependencies
import { Home } from '@/pages/home';
import { history } from '@/constants';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import * as ROUTE from '@/constants/routes';
import { Maintenance, NotFound } from '@/components/error-pages';
import { useAppControllerStore } from '@/pages/app.controller';
import { AppPreloader } from '@/components/app-preloader';


export const App = memo(function App () {
  // NOTE (Mobile-)Browsers implement the vh-unit differently.
  // To avoid layout-inconsistencies and janks,
  // this hook provides a normalized value for vh stored in a global CSS-variable
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/#article-header-id-0
  useVH();

  const { health, initialized, initialize } = useAppControllerStore((state) => state);

  // NOTE initialize business logic
  useEffect(() => { initialize({}); }, [initialize]);

  // NOTE select view based on application state
  // if (!health) { return <Maintenance />; }
  if (!initialized) { return <AppPreloader />; }

  return <>
    <Router history={history}>
      <Routes>
        <Route path={ROUTE.HOME.ROUTE} element={<Home />} />
        <Route path={ROUTE.SIGN_IN.ROUTE} element={<SignIn />} />
        <Route path={ROUTE.SIGN_UP.ROUTE} element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
        { /* direct 404 */ }
        <Route path={ROUTE.NO_MATCH.ROUTE} element={<NotFound />} />
        { /* as 404 */ }
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  </>;
});
