import {BASE_URL_SERVER} from "../config";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_CATEGORY: "/api/v1/category",
    ADMIN_DETAIL_CATEGORY: "/api/v1/category/",
    ADMIN_CREATE_CATEGORY: "/api/v1/category",
    ADMIN_UPDATE_CATEGORY: "/api/v1/category/",
    ADMIN_DELETE_CATEGORY: "/api/v1/category/",
}

class CategoryService {
    adminListCategory = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_CATEGORY, config);
    }

    adminDetailCategory = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_CATEGORY + id, config);
    }

    adminCreateCategory = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_CATEGORY, data, config);
    }

    adminUpdateCategory = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_CATEGORY + id, data, config);
    }

    adminDeleteCategory = (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_CATEGORY + id, config);
    }
}

const categoryService = new CategoryService();
export default categoryService;