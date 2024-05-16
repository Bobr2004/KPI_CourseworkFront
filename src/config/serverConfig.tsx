import axios from "axios";

const config = {
   serverIP: "http://localhost:3001"
};

const learnAPI = axios.create({
   baseURL: config.serverIP
});

const learnCredintialsAPI = axios.create({
   baseURL: config.serverIP,
   withCredentials: true
});

export {learnAPI, learnCredintialsAPI};
