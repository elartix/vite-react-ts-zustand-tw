// outsource dependencies
import useVH from 'react-vh';
import { memo, useEffect } from 'react';
import { ErrorBoundary } from '@suspensive/react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router';


// local dependencies
import { Home } from '@/pages/home';
// import { history } from '@/constants';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import * as ROUTE from '@/constants/routes';
import { AppProvider } from '@/pages/app.provider';
import { AppPreloader } from '@/components/app-preloader';
import { useAppControllerStore } from '@/pages/app.controller';
import { Maintenance, NotFound } from '@/components/error-pages';


export const App = memo(function App () {
  // NOTE (Mobile-)Browsers implement the vh-unit differently.
  // To avoid layout-inconsistencies and janks,
  // this hook provides a normalized value for vh stored in a global CSS-variable
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/#article-header-id-0
  useVH();

  const { health, initialized, initialize } = useAppControllerStore((state) => state);

  // NOTE initialize business logic
  useEffect(() => {
    initialize({});
  }, [initialize]);

  // NOTE select view based on application state
  // if (!health) { return <Maintenance />; }
  if (!initialized) {
    return <AppPreloader/>;
  }

  return <>
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div>
          <button onClick={reset}>Reset</button>
          { error.message }
        </div>
      )}
    >
      <Router unstable_useTransitions>
        <AppProvider>
          <Routes>
            <Route path={ROUTE.HOME.ROUTE} element={<Home/>}/>
            <Route path={ROUTE.SIGN_IN.ROUTE} element={<SignIn/>}/>
            <Route path={ROUTE.SIGN_UP.ROUTE} element={<SignUp/>}/>
            { /* <Route path="*" element={<Navigate to="/"/>}/> */ }
            <Route path="*" element={<Navigate to={ROUTE.NO_MATCH.ROUTE}/>}/>
            { /* direct 404 */ }
            <Route path={ROUTE.NO_MATCH.ROUTE} element={<NotFound/>}/>
            { /* as 404 */ }
            <Route element={<NotFound/>}/>
          </Routes>
        </AppProvider>
      </Router>
    </ErrorBoundary>
  </>;
});
