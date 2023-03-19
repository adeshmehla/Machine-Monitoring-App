import "./styles.css";

// import { DetailsPage } from "./component/pages/detailsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./component/feature/login";
import { Signup } from "./component/feature/signup";
import Profile from "./component/pages/profile";
import { QrCode } from "./component/pages/qr/qr_code";
import { ForgotPassword } from "./component/feature/forgot_password";
import { NotificationConfirmation } from "./component/pages/notificationConfirmation";

import {MechanicForm } from "./component/pages/form/mechanicForm";
import { SupervisorForm } from "./component/pages/form/supervisorForm";
export default function App() {
   
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/mechanic" element={<MechanicForm />} />
          <Route path="/supervisor" element={<SupervisorForm />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/details" element={<DetailsPage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/qrcode" element={<QrCode />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/notification_confirmation" element={<NotificationConfirmation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
