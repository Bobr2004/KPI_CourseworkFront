import axios from "axios";
import { config } from "../config/serverConfig";

const post = axios.create({
   baseURL: config.serverIP,
   method: "post"
});

type loginUserType = {
   email: string;
   password: string;
};

const loginUser = async ({ email, password }: loginUserType) => {
   const response = await post("/createUser", {
      data: {
         email,
         password
      }
   });
   return response;
};

type createUserType = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
};

const createUser = async ({
   firstName,
   lastName,
   email,
   password
}: createUserType) => {
   const response = await post("/createUser", {
      data: {
         firstName,
         lastName,
         email,
         password
      }
   });
   return response;
};

export { createUser, loginUser };
