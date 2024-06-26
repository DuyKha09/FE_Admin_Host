import {BASE_URL_SERVER} from "../config";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PET: "/api/v1/pet",
    ADMIN_DETAIL_PET: "/api/v1/pet/",
    ADMIN_CREATE_PET: "/api/v1/pet",
    ADMIN_UPDATE_PET: "/api/v1/pet/",
    ADMIN_DELETE_PET: "/api/v1/pet/",
}

class PetService {
    adminListPet = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PET, config);
    }

    adminDetailPet = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PET + id, config);
    }

    adminCreatePet = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_PET, data, config);
    }

    adminUpdatePet = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PET + id, data, config);
    }

    adminDeletePet = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_PET + id, config);
    }
}

const petService = new PetService();
export default petService;