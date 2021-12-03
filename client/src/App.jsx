import React from 'react';
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
// import Tooltip from './components/tooltip';

const SettingsWithAuth = withRouter(withAuth(Settings));
const UsersWithAuth = withRouter(withAuth(Users));
const UserWithAuth = withRouter(withAuth(User));
const CustomerWithAuth = withRouter(withAuth(Customer));
const CustomersWithAuth = withRouter(withAuth(Customers));

function App({error}) {
  const theme = useTheme();

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
                  (
                    <Switch>
                      <Route exact path="/" component={UsersWithAuth} />
                      <Route exact path="/Login">
                        <Login />
                      </Route>
                      <Route exact path="/Settings">
                        <SettingsWithAuth />
                      </Route>
                      <Route exact path="/Users">
                        <UsersWithAuth />
                      </Route>
                      <Route exact path="/User">
                        <UserWithAuth />
                      </Route>
                      <Route exact path="/Customers">
                        <CustomersWithAuth />
                      </Route>
                      <Route exact path="/Customer">
                        <CustomerWithAuth />
                      </Route>
                      <Route component={PageNotFound} />
                      <Route component={ServerNotReady} />
                    </Switch>
                  )
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
