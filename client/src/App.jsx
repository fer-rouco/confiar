import { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { BarsProvider } from './components/bars/bars-context';
import NavBar from './components/bars/nav-bar';
import SideBar from './components/bars/side-bar';
import AlertMessage from './components/general/alert-message';
import withAuth from './components/general/protected-routes';
import { AlertMessageProvider } from './contexts/alert-message-context';
import { useTheme } from './contexts/theme-context';
import Customer from './pages/customer';
import Customers from './pages/customers';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import ServerNotReady from './pages/server-not-ready';
import Settings from './pages/settings';
import User from './pages/user';
import Users from './pages/users';
import { GlobalStyles } from './theme';
import useReactPath from './hooks/path-name';
import useRoutesResolver from './hooks/routes-resolver';
// import Tooltip from './components/tooltip';

const componentsMap = { 
  logIn: Login,
  settings: withRouter(withAuth(Settings)),
  users: withRouter(withAuth(Users)),
  user: withRouter(withAuth(User)),
  customers: withRouter(withAuth(Customers)),
  customer: withRouter(withAuth(Customer))
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
    let routes = [];

    if (routeItem.children) {
      routes = buildRegisteredRoutes(routeItem.children);
    }
    if (routeItem) {
      if (Array.isArray(routeItem)) {
        routeItem.forEach((routeItemChild) => {
          routes.push(buildRegisteredRoute(routeItemChild));
        });
      }
      else if (Object(routeItem) === routeItem) {
        routes.push(buildRegisteredRoute(routeItem));
      }
    }
    return routes;
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
        <Route component={PageNotFound} />
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
                { (!error) ?
                  routes
                :
                  (
                    <Switch>
                      <Route component={ServerNotReady} />
                    </Switch>
                  )
                }
            </div>
          </div>
        </div>
      </AlertMessageProvider>
    </ThemeProvider>
  );
}

export default App;
