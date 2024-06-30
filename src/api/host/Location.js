import {BASE_URL_SERVER} from "../config";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_LOCATION: "/api/v1/location",
    ADMIN_DETAIL_LOCATION: "/api/v1/location/",
    ADMIN_CREATE_LOCATION: "/api/v1/location",
    ADMIN_UPDATE_LOCATION: "/api/v1/location/",
    ADMIN_DELETE_LOCATION: "/api/v1/location/",
}

class LocationService {
    adminListLocation = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_LOCATION, config);
    }

    adminDetailLocation = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_LOCATION + id, config);
    }

    adminCreateLocation = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_LOCATION, data, config);
    }

    adminUpdateLocation = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.patch(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_LOCATION + id, data, config);
    }

    adminDeleteLocation = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_LOCATION + id, config);
    }
}

const locationService = new LocationService();
export default locationService;