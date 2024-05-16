import axios from "axios";

const config = {
   serverIP: "https://some-domain.com/api/v2"
};

const learnAPI = axios.create({
   baseURL: config.serverIP
});

const learnCredintialsAPI = axios.create({
   baseURL: config.serverIP,
   withCredentials: true
});

export {learnAPI, learnCredintialsAPI};
