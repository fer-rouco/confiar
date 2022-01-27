import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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

const componentsMap = { 
  logIn: lazyImport('login'),
  settings: withRouter(withAuth(lazyImport('settings'))),
  users: withRouter(withAuth(lazyImport('users'))),
  user: withRouter(withAuth(lazyImport('user'))),
  customers: withRouter(withAuth(lazyImport('customers'))),
  customer: withRouter(withAuth(lazyImport('customer')))
}

function App({error}) {
  const theme = useTheme();
  const pathname = useReactPath();
  const [routes, setRoutes] = useState(null);
  const routesResolver = useRoutesResolver();

  function buildDynamicComponent(componentName) {
    const DynamicComponent = componentsMap[componentName];
    return <DynamicComponent/>;
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
      <Route exact path={routesResolver.getUrl(routeItem.id)} key={routeItem.id} >
        { buildDynamicComponent(routeItem.id) }
      </Route>
    ) : (<></>);
  }

  function buildRoutes() {
    setRoutes(
      <Switch>
        <Route exact path="/" component={componentsMap['users']} />
          { routesResolver.getAllItems().map((routeItem) => buildRegisteredRoutes(routeItem)) }
        <Route component={lazyImport('page-not-found')} />
      </Switch>
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
                    <Switch>
                      <Route component={lazyImport('server-not-ready')} />
                    </Switch>
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
