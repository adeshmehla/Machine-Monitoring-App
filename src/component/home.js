import React from 'react'
import {Route, Routes } from "react-router-dom";
import { Login } from './feature/login';
import { Signup } from './feature/signup';
import { MechanicForm } from './pages/form/mechanicForm';
import { SupervisorForm } from './pages/form/supervisorForm';
import { ManagerHomePage } from './pages/managerPages/Managerhome';
import { MechanicTableForManager } from './pages/managerPages/inventory/mechanicTableForManager';
import { ViewInventory } from './pages/managerPages/inventory/viewInventory';
import { MechanicDataTable } from './pages/MechanicDataTable';
import { NotificationConfirmation } from './pages/notificationConfirmation';
import { QrCode } from './pages/qr/qr_code';
import { SupervisorScanner } from './pages/qr/supervisorScanner';
import {MyChart } from './pages/managerPages/analysis';
import Navbar from '../component/pages/managerPages/navbar';
export const Home = () => {
  let manager = localStorage.getItem('isManager')
  let mechanic = localStorage.getItem('isMechanic')
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
      {/* <Route path="/manager" element={<ManagerHomePage />}/> */}
      {/* <Route path="/manager" element={<Navbar/>} /> */}
{/* <Route path="/manager/mechanicTableForManager" element={<MechanicTableForManager />} /> */}
{/* <Route path="/manager/viewInventory" element={<ViewInventory />} /> */}
<Route path="/ManagerHomePage" element={<ManagerHomePage />} />
<Route path="/analysis" element={<MyChart />} />
      <Route path="/signup" element={<Signup />} />
</> :   <Route path="/" element={<Login />} />
}
{supervisor ? <>
      <Route path="/supervisor" element={<SupervisorForm />} />
      <Route path="/supervisorScanner" element={<SupervisorScanner />} />
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
