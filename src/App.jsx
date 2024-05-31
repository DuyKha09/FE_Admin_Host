import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/Login/LoginPage";
import HostPage from "./pages/HostPage/HostPage";


function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/host" element={<HostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
