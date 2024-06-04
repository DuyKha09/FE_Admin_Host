import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/Login/LoginPage";
import Forbidden from "./pages/Forbidden/Forbidden";
import NotFound from "./pages/404page/404page";

import AdminPage from "./pages/AdminPage/AdminPage";
import ManageAccount from "./components/Admin/ManageAccount";
import ManageCustomerAccount from "./components/Admin/ManageCustomerAccount";

import HostPage from "./pages/HostPage/HostPage";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="/admin/manageAccount" element={<ManageAccount />} />
            <Route
              path="/admin/manageCustomerAccount"
              element={<ManageCustomerAccount />}
            />
          </Route>
          <Route path="/host" element={<HostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
