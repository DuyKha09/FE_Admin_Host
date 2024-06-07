import {BASE_URL_SERVER} from "../config";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_BRAND: "/admin/api/brands/list",
    ADMIN_DETAIL_BRAND: "/admin/api/brands/detail/",
    ADMIN_CREATE_BRAND: "/admin/api/brands",
    ADMIN_UPDATE_BRAND: "/admin/api/brands/",
    ADMIN_DELETE_BRAND: "/admin/api/brands/",
}

class BrandService {
    adminListBrand = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_BRAND, config);
    }

    adminDetailBrand = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_BRAND + id, config);
    }

    adminCreateBrand = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_BRAND, data, config);
    }

    adminUpdateBrand = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_BRAND + id, data, config);
    }

    adminDeleteBrand = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_BRAND + id, config);
    }
}

const brandService = new BrandService();
export default brandService;