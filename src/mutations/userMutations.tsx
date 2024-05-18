import { learnCredintialsAPI } from "../config/serverConfig";

// SEND login user credentials and receive JWT cookie
type loginUserType = {
   email: string;
   password: string;
};

const loginUser = async (userLogData: loginUserType) => {
   const response = await learnCredintialsAPI.post("/login-user", userLogData);
   return response;
};
//

// SEND registration user credentials and receive JWT cookie
type createUserType = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
};

const createUser = async (userRegData: createUserType) => {
   const response = await learnCredintialsAPI.post("/create-user", userRegData);
   return response;
};
//

type patchUserType = {
   id: number;
   firstName?: string;
   lastName?: string;
   email?: string;
   password?: string
};

const patchUser = async (userRegData: patchUserType) => {
   const response = await learnCredintialsAPI.patch("/patch-user", userRegData);
   return response;
};

export { loginUser, createUser, patchUser };

export type { loginUserType, createUserType, patchUserType };
