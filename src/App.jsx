import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
