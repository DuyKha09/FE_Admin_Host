import {BASE_URL_SERVER} from "../config";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_APPOINTMENT: "/api/v1/appointment",
    ADMIN_DETAIL_APPOINTMENT: "/api/v1/appointment/",
    ADMIN_CREATE_APPOINTMENT: "/api/v1/appointment",
    ADMIN_UPDATE_APPOINTMENT: "/api/v1/appointment/",
    ADMIN_DELETE_APPOINTMENT: "/api/v1/appointment/",

    ADMIN_MY_HOST_APPOINTMENT: "/api/v2/appointment/host/my-appointments",
    ADMIN_CONFIRM_APPOINTMENT: "/api/v1/appointment/confirmation/",
}

class AppointmentService {
    adminListAppointment = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_APPOINTMENT, config);
    }

    hostMyAppointment = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_MY_HOST_APPOINTMENT, config);
    }

    adminDetailAppointment = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_APPOINTMENT + id, config);
    }

    adminCreateAppointment = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_APPOINTMENT, data, config);
    }

    adminUpdateAppointment = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_APPOINTMENT + id, data, config);
    }

    adminConfirmAppointment = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };

        let data = {
            id: id
        }

        let req = JSON.stringify(data);
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CONFIRM_APPOINTMENT + id, req, config);
    }

    adminDeleteAppointment = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_APPOINTMENT + id, config);
    }
}

const
    appointmentService = new AppointmentService();
export default appointmentService;