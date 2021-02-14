import React, { FC, useContext, useEffect } from 'react';
import './App.less';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUp } from './pages/Register/RegisterPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { authContext, AuthProvider } from './contexts/AuthenticationContext';
import { CalendarPage } from './pages/Booking/CalendarPage';
import { AvailabilityPage } from './pages/Availability/AvailabilityPage';

export const BasePage = () => {
  const { token } = useContext(authContext);
  if (token) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/login" />;
  }
};

const UnauthenticatedRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  const { token } = useContext(authContext);
  if (token === null) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/" />;
};

const AuthenticatedRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  const {
    token,
    actions: { getTokenData, logout },
  } = useContext(authContext);
  if (token !== null) {
    const tokenData = getTokenData();
    if (tokenData !== null) {
      const { exp } = tokenData;
      if (parseInt(exp) * 1000 > Date.now()) {
        return <Route {...routeProps} />;
      }
      logout();
    }
  }
  return <Redirect to="/" />;
};

const App: FC = () => {
  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const helloJson = await helloRequest.json();
      console.log(helloJson);
    })();
  });


  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <UnauthenticatedRoute exact path="/login" component={LoginPage} />
          <UnauthenticatedRoute exact path="/register" component={SignUp} />
          <UnauthenticatedRoute exact path="/booking" component={CalendarPage} />
          <AuthenticatedRoute exact path="/dashboard" component={DashboardPage} />
          {/* <Route exact path = "user/:userid/booking/offer/:offername/:minute"/> */}
          <AuthenticatedRoute exact path="/Availability" component={AvailabilityPage} />
          <Route path="/" component={BasePage} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
