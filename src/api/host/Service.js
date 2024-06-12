import {BASE_URL_SERVER} from "../config";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_SERVICE: "/admin/api/services/list",
    ADMIN_DETAIL_SERVICE: "/admin/api/services/detail/",
    ADMIN_CREATE_SERVICE: "/admin/api/services",
    ADMIN_UPDATE_SERVICE: "/admin/api/services/",
    ADMIN_DELETE_SERVICE: "/admin/api/services/",
}

class ServiceService {
    adminListService = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_SERVICE, config);
    }

    adminDetailService = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_SERVICE + id, config);
    }

    adminCreateService = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_SERVICE, data, config);
    }

    adminUpdateService = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_SERVICE + id, data, config);
    }

    adminDeleteService = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_SERVICE + id, config);
    }
}

const serviceService = new ServiceService();
export default serviceService;