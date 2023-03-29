import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Route, Routes, Navigate } from "react-router-dom";
import { ForgotPassword } from './feature/forgot_password';
import { Login } from './feature/login';
import { Signup } from './feature/signup';
import { MechanicForm } from './pages/form/mechanicForm';
import { SupervisorForm } from './pages/form/supervisorForm';
import { ManagerHomePage } from './pages/managerPages/Managerhome';
import { MechanicDataTable } from './pages/MechanicDataTable';
import { NotificationConfirmation } from './pages/notificationConfirmation';
import Profile from './pages/profile';
import { QrCode } from './pages/qr/qr_code';

export const Home = () => {
  // const[isAuth,setIsAuth]=useState(false); 
  // const isAuthenticated =  useSelector(state=>state.pageReducer.isAuth);
  // useEffect(()=>{
  //   setIsAuth(isAuthenticated);
  // },[])
  let manager = localStorage.getItem('isManager')
  let mechanic = localStorage.getItem('isMechanic')
  // console.log(mechanic,'0000000000000')
  let supervisor = localStorage.getItem('isSupervisor')
    return (
      <>  
    
    <Routes>
{mechanic ? <>
<Route path="/mechanic" element={<MechanicForm />} />
<Route path="/mechanicdatatable" element={<MechanicDataTable />} />
<Route path="/qrcode" element={<QrCode />} />
      <Route path="/notification_confirmation" element={<NotificationConfirmation />} />
</>:   <Route path="/" element={<Login />} />
}
{manager ? <>
      <Route path="/manager" element={<ManagerHomePage />} />
      <Route path="/signup" element={<Signup />} />
</> :   <Route path="/" element={<Login />} />
}
{supervisor ? <>
      <Route path="/supervisor" element={<SupervisorForm />} />
      <Route path="/qrcode" element={<QrCode />} />
      <Route path="/notification_confirmation" element={<NotificationConfirmation />} />
      
</> :   <Route path="/" element={<Login />} />
}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/details" element={<DetailsPage />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Login />} />
      {/* <Route path="/forgot_password" element={<ForgotPassword />} /> */}
      </Routes>  
      </>
  )
}
