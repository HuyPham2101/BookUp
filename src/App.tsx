import React, { FC, useContext, useEffect } from 'react';
import './App.less';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUp } from './pages/Register/RegisterPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { authContext, AuthProvider } from './contexts/AuthenticationContext';

export const BasePage = () => {
  const {token} = useContext(authContext)
  if(token){
    return <Redirect to= "/dashboard" /> ;
  } else {
    return <Redirect to = "/login" />
  }
}
const App: FC = () => {
  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const helloJson = await helloRequest.json();
      console.log(helloJson);
    })();
  });

  
  // return (
  //  <div className="App">
  //    {/* <DashboardPage/> */}
  //    {/* <CalendarPage /> */}
  //    <LoginPage/>
  // </div>
  // );

  return (
    <AuthProvider>
      <Router>
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={SignUp} />
        <Route path = "/" component = {BasePage} />
      </Router>
    </AuthProvider>
  );
}

export default App;
