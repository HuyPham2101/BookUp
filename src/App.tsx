import React, { FC, useContext, useEffect } from 'react';
import './App.less';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUp } from './pages/Register/RegisterPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { CalendarPage } from './pages/Calendar/CalendarPage';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { authContext, AuthProvider } from './contexts/AuthenticationContext';
import { AvailabilityPage } from './pages/Availability/AvailabilityPage';
import { BookingOfUserPage } from './pages/Meetings/MeetingsPage';
import { SettingsPage } from './pages/Settings/SettingsPage'

export const BasePage = () => {
  const { token } = useContext(authContext);
  if (token) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/login" />;
  }
};

const PublicRoute: React.FC<RouteProps> = ({
  children,
  ...routeProps
}) => {
  return <Route {...routeProps} />;
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
          <PublicRoute path="/booking/:offerId" component={CalendarPage} />
          <UnauthenticatedRoute exact path="/login" component={LoginPage} />
          <UnauthenticatedRoute exact path="/register" component={SignUp} />
          <AuthenticatedRoute exact path="/dashboard" component={DashboardPage} />
          {/* <Route exact path = "user/:userid/booking/offer/:offername/:minute"/> */}
          <AuthenticatedRoute exact path="/meetings" component={BookingOfUserPage} />
          <AuthenticatedRoute exact path="/Availability" component={AvailabilityPage} />
          <AuthenticatedRoute exact path="/settings" component={SettingsPage} />
          <Route path="/" component={BasePage} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
