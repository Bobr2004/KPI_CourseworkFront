import { learnCredintialsAPI } from "../config/serverConfig";

// SEND JWT cookie and GET current user data (for global context)
type UserContextProps = {
   id: number;
   role: string;
   firstName: string;
   lastName: string;
};

const currentUser = async () => {
   const { data }: { data: UserContextProps } = await learnCredintialsAPI.get(
      `/currentUser`
   );
   return data;
};
//

// SEND login user credentials and receive JWT cookie
type loginUserType = {
   email: string;
   password: string;
};

const loginUser = async (userLogData: loginUserType) => {
   const response = await learnCredintialsAPI.post("/loginUser", userLogData);
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
   const response = await learnCredintialsAPI.post("/createUser", userRegData);
   return response;
};
// 

export { currentUser, loginUser, createUser };

export type { UserContextProps, loginUserType, createUserType };
