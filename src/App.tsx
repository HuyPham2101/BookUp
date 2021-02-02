import React, { FC, useEffect } from 'react';
import './App.less';
import { LoginPage } from './pages/Login/LoginPage';
import { CalendarPage } from './pages/Booking/CalendarPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';



const App: FC = () => {
  useEffect(() => {
    (async function () {
      const helloRequest = await fetch("/api");
      const helloJson = await helloRequest.json();
      console.log(helloJson);
    })();
  });

  return (
   <div className="App">
     {/* <DashboardPage/> */}
     {/* <CalendarPage /> */}
     <LoginPage/>
  </div>
  );
}

export default App;
