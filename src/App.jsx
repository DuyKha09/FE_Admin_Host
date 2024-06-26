import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/Login/LoginPage";
import HostPage from "./pages/HostPage/HostPage";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
/* Category */
import ListCategory from "./components/Host/Category/List";
import CreateCategory from "./components/Host/Category/Create";
import DetailCategory from "./components/Host/Category/Detail";
/* Service */
import ListService from "./components/Host/Service/List";
import CreateService from "./components/Host/Service/Create";
import DetailService from "./components/Host/Service/Detail";

/* Appointment */
import MyAppointment from "./components/Host/Appointment/My";
import ListAppointment from "./components/Host/Appointment/List";
import CreateAppointment from "./components/Host/Appointment/Create";
import DetailAppointment from "./components/Host/Appointment/Detail";

/* Brand */
import ListBrand from "./components/Host/Brand/List";
import CreateBrand from "./components/Host/Brand/Create";
import DetailBrand from "./components/Host/Brand/Detail";

import Forbidden from "./pages/Forbidden/Forbidden";
import NotFound from "./pages/404page/404page";

import ManageAccount from "./components/Admin/ManageAccount/ManageAccount";
import ManageCustomerAccount from "./components/Admin/ManageCustomerAccount/ManageCustomerAccount";
import UserDetail from "./components/Admin/ManageCustomerAccount/UserDetail";
import ManageService from "./components/Admin/ManageService/ManageService";
import ServiceDetail from "./components/Admin/ManageService/ServiceDetail";

function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/forbidden" element={<Forbidden/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/admin" element={<AdminPage/>}>
                        <Route path="/admin/manageAccount" element={<ManageAccount/>}/>
                        <Route
                            path="/admin/manageCustomerAccount"
                            element={<ManageCustomerAccount/>}
                        />
                        <Route
                            path="/admin/manageCustomerAccount/:user_id"
                            element={<UserDetail/>}
                        />
                        <Route path="/admin/manageService" element={<ManageService/>}/>
                        <Route
                            path="/admin/manageService/:id"
                            element={<ServiceDetail/>}
                        />
                    </Route>
                    <Route path="/host" element={<HostPage/>}></Route>

                    {/* Category */}
                    <Route path='/host/categories/list' element={<ListCategory/>}/>
                    <Route path='/host/categories/create' element={<CreateCategory/>}/>
                    <Route path='/host/categories/detail/:id' element={<DetailCategory/>}/>
                    {/* Service */}
                    <Route path='/host/services/list' element={<ListService/>}/>
                    <Route path='/host/services/create' element={<CreateService/>}/>
                    <Route path='/host/services/detail/:id' element={<DetailService/>}/>
                    {/* Brand */}
                    <Route path='/host/brands/list' element={<ListBrand/>}/>
                    <Route path='/host/brands/create' element={<CreateBrand/>}/>
                    <Route path='/host/brands/detail/:id' element={<DetailBrand/>}/>
                    {/* Appointment */}
                    <Route path='/host/my/appointments' element={<MyAppointment/>}/>
                    <Route path='/host/appointments/list' element={<ListAppointment/>}/>
                    <Route path='/host/appointments/create' element={<CreateAppointment/>}/>
                    <Route path='/host/appointments/detail/:id' element={<DetailAppointment/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
