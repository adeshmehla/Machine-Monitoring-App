import "./styles.css";
import { Home } from "./component/pages/home";
import { DetailsPage } from "./component/pages/detailsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./component/feature/login";
import { Signup } from "./component/feature/signup";
import Profile from "./component/pages/profile";
import { ForgotPassword } from "./component/feature/forgot_password";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
