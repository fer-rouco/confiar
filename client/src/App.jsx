import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { BarsProvider } from './components/bars/bars-context';
import NavBar from './components/bars/nav-bar';
import SideBar from './components/bars/side-bar';
import AlertMessage from './components/general/alert-message';
import withAuth from './components/general/protected-routes';
import { AlertMessageProvider } from './contexts/alert-message-context';
import { useTheme } from './contexts/theme-context';
import { GlobalStyles } from './theme';
import useReactPath from './hooks/path-name';
import useRoutesResolver from './hooks/routes-resolver';
import LoadIndicator from './components/general/load-indicator';
// import Tooltip from './components/tooltip';

function lazyImport(route) {
  return lazy(() => import('./pages/'.concat(route)));
}

function App({error}) {
  const theme = useTheme();
  const pathname = useReactPath();
  const [routes, setRoutes] = useState(null);
  const routesResolver = useRoutesResolver();

  function buildDynamicRouteElement(elementName) {
    let DynamicElement;
    const elementNameInLowerCase = elementName.toLowerCase();
    if (elementNameInLowerCase.indexOf('login') > -1) {
      DynamicElement = lazyImport(elementNameInLowerCase);
    }
    else {
      DynamicElement = withAuth(lazyImport(elementNameInLowerCase));
    }
    return <DynamicElement/>;
  }

  function buildRegisteredRoutes(routeItem) {
    let registeredRoutes = [];

    if (routeItem.children) {
      registeredRoutes = buildRegisteredRoutes(routeItem.children);
    }
    if (routeItem) {
      if (Array.isArray(routeItem)) {
        routeItem.forEach((routeItemChild) => {
          registeredRoutes.push(buildRegisteredRoute(routeItemChild));
        });
      }
      else if (Object(routeItem) === routeItem) {
        registeredRoutes.push(buildRegisteredRoute(routeItem));
      }
    }
    return registeredRoutes;
  }

  function buildRegisteredRoute(routeItem) {
    return (routeItem) ? (
      <Route path={routesResolver.getUrl(routeItem.id)} key={routeItem.id} element={buildDynamicRouteElement(routeItem.id)} ></Route>
    ) : (
      <></>
    );
  }

  function buildRoutes() {
    const mainRoute = buildDynamicRouteElement('users');
    setRoutes(
      <Routes>
        <Route path="/" element={mainRoute} />
        { routesResolver.getAllItems().map((routeItem) => buildRegisteredRoutes(routeItem)) }
        <Route path="*" element={buildDynamicRouteElement('page-not-found')} />
      </Routes>
    );
  }

  useEffect(() => {
    buildRoutes();
  }, [pathname]);

  return (
    <ThemeProvider theme={theme.getCurrent()}>
      <GlobalStyles />
      {/* <Tooltip></Tooltip> */}
      <AlertMessageProvider>
        <AlertMessage></AlertMessage>
        <BarsProvider>
          <NavBar title="Confiar" />
          <SideBar icon="cart3"></SideBar>
        </BarsProvider>
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col">
              <Suspense fallback={<LoadIndicator></LoadIndicator>}>
                { (!error) ?
                  routes
                :
                  (
                    <Routes>
                      <Route element={lazyImport('server-not-ready')} />
                    </Routes>
                  )
                }                
              </Suspense>
            </div>
          </div>
        </div>
      </AlertMessageProvider>
    </ThemeProvider>
  );
}

export default App;
