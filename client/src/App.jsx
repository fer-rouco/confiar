import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import withAuth from './components/general/protected-routes';
import Customer from './pages/customer';
import Customers from './pages/customers';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import ServerNotReady from './pages/server-not-ready';
import User from './pages/user';
import Users from './pages/users';

const UsersWithAuth = withRouter(withAuth(Users));
const UserWithAuth = withRouter(withAuth(User));
const CustomerWithAuth = withRouter(withAuth(Customer));
const CustomersWithAuth = withRouter(withAuth(Customers));

function App({error}) {
  return (
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
  );
}

export default App;
