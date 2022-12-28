import axios from "axios";
import constants from "../constants";

axios.defaults.withCredentials = false

class DataSerivce {
    get = async (endpoint, data) => {
        let response
        try {
            response = await axios.get(constants.REST_API_ENDPOINT + "/" + endpoint, data)
        } catch (err) {
            // TODO: Handle error
            throw err
        }

        return response
    }

    post = async (endpoint, data) => {
        let response
        try {
            response = await axios.post(constants.REST_API_ENDPOINT + "/ " + endpoint, data)
        } catch (err) {
            // TODO: Handle error
            throw err
        }

        return response
    }
}

export default new DataSerivce();