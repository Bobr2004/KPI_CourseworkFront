import { learnCredintialsAPI } from "../config/serverConfig";


// JSON that i recieve whenever i reg, log, or patch user
type UserMutationsRecieve = {
   id: number;
}
// 

// SEND login user credentials and receive JWT cookie
type loginUserType = {
   email: string;
   password: string;
};

const loginUser = async (userLogData: loginUserType) => {
   const { data }: { data: UserMutationsRecieve } = await learnCredintialsAPI.post(
      "/login-user",
      userLogData
   );
   return data;
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
   const { data }: { data: UserMutationsRecieve } = await learnCredintialsAPI.post("/create-user", userRegData);
   return data;
};
//

type patchUserType = {
   id: number;
   firstName?: string;
   lastName?: string;
   email?: string;
   password?: string;
};

const patchUser = async (userRegData: patchUserType) => {
   const { data }: { data: UserMutationsRecieve } = await learnCredintialsAPI.patch("/patch-user", userRegData);
   return data;
};

export { loginUser, createUser, patchUser };

export type { loginUserType, createUserType, patchUserType };