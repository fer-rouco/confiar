import { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeModeProvider } from './contexts/theme-context';
import withAuth from './components/general/protected-routes';
import Settings from './pages/settings';
import Customer from './pages/customer';
import Customers from './pages/customers';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import ServerNotReady from './pages/server-not-ready';
import User from './pages/user';
import Users from './pages/users';
import { GlobalStyles } from './theme';
import { useTheme } from './contexts/theme-context';

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
    </ThemeProvider>
  );
}

export default App;
