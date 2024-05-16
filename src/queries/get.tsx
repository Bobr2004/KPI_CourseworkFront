import axios from "axios";
import { config } from "../config/serverConfig";

// если шо то types тут так для кайфа, чтоб тебе по файлам не лазить, я их потом уберу

const get = axios.create({
   baseURL: config.serverIP,
   method: "get"
});

const getLessons = async () => {
   const { data } = await get("/getLessons");
   return data;
};


const getLesson = (id: number) => async () => {
   const { data } = await get(`/getLesson/${id}`);
   return data;
};

const getTheory = (id: number) => async () => {
   const { data } = await get(`/getTheory/${id}`);
   return data;
};

const getTest = (id: number) => async () => {
   const { data } = await get(`/getTest/${id}`);
   return data;
};

const currentUser = async () => {
   const { data } = await get(`/currentUser`);
   return data;
};

export { getLesson, getLessons, getTheory, getTest, currentUser };
