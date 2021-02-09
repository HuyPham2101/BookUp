import React, { FC, useContext, useEffect } from 'react';
import './App.less';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUp } from './pages/Register/RegisterPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { authContext, AuthProvider } from './contexts/AuthenticationContext';

export const BasePage = () => {
  const {token , actions: {getTokenData, logout}} = useContext(authContext)
  console.log(213124433)
  if(token !== null){
    const tokenData = getTokenData()
    if(tokenData !== null) {
      const {exp} = tokenData
      console.log(parseInt(exp) *1000)
      console.log(Date.now())
      if(parseInt(exp) * 1000 > Date.now()){
        return <Redirect to = "/dashboard"/>
      }
      logout();
    } 
  } return <Redirect to = "/" />
  
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
