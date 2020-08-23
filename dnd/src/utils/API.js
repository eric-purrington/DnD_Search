import axios from "axios";

export default {
    getInfo: function(query) {
        return axios.get("https://api.open5e.com/" + query);
    }
}