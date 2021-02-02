import React, { FC, useEffect } from 'react';
import './App.less';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUp } from './pages/Register/RegisterPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';


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
  <Router>
    <Route exact path="/" component={DashboardPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={SignUp} />
  </Router>
  );
}

export default App;
