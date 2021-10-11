import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import AlertMessage from './components/alert-message';
import { BarsProvider } from './components/bars/bars-context';
import NavBar from './components/bars/nav-bar';
import SideBar from './components/bars/side-bar';
import withAuth from './components/protected-routes';
import { AlertMessageProvider } from './contexts/alert-message-context';
import { ErrorProvider } from './contexts/error-context';
import { SessionProvider } from './contexts/session-context';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import Stats from './pages/stats';
import Stores from './pages/stores';
import User from './pages/user';
import Users from './pages/users';
import ServerNotReady from './pages/server-not-ready';
import { getSessionInfo } from './services/session-service';
import Customer from './pages/customer';
import Customers from './pages/customers';
// import Tooltip from './components/tooltip';

let routing;
getSessionInfo()
  .then((sessionInfo) => {
    const UsersWithAuth = withRouter(withAuth(Users));
    const UserWithAuth = withRouter(withAuth(User));
    const StoresWithAuth = withRouter(withAuth(Stores));
    const StatsWithAuth = withRouter(withAuth(Stats));
    const CustomerWithAuth = withRouter(withAuth(Customer));
    const CustomersWithAuth = withRouter(withAuth(Customers));

    routing = (
      <React.StrictMode>
        {/* <Tooltip></Tooltip> */}
        <AlertMessageProvider>
          <AlertMessage></AlertMessage>
          <ErrorProvider>
            <BrowserRouter>
              <SessionProvider>
                <BarsProvider>
                  <NavBar title="Confiar" />
                  <SideBar icon="cart3"></SideBar>
                </BarsProvider>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col">
                      <Switch>
                        <Route exact path="/" component={StoresWithAuth} />
                        <Route exact path="/Login">
                          <Login />
                        </Route>
                        <Route exact path="/Stores">
                          <StoresWithAuth />
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
                        <Route exact path="/Stats">
                          <StatsWithAuth />
                        </Route>
                        <Route component={PageNotFound} />
                        <Route component={ServerNotReady} />
                      </Switch>
                    </div>
                  </div>
                </div>
              </SessionProvider>
            </BrowserRouter>
          </ErrorProvider>
        </AlertMessageProvider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    routing = (
      <React.StrictMode>
        <BrowserRouter>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
                <Switch>
                  <Route exact path="/" component={ServerNotReady} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .finally(() => {
    ReactDOM.render(routing, document.getElementById('root'));
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
// if (import.meta.hot) {
//   import.meta.hot.accept();
// }
