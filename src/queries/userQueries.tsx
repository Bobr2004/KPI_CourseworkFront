import { learnAPI, learnCredintialsAPI } from "../config/serverConfig";

// SEND JWT cookie and GET current user data (for global context)
type UserContextProps = {
   id: number;
   role: string;
   firstName: string;
   lastName: string;
};

const currentUser = async () => {
   const { data }: { data: UserContextProps } = await learnAPI.get(
      `/current-user`
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

type AccountProps = {
   id: number;
   role: string;
   email: string;
   firstName: string;
   lastName: string;
   score: number;
   testList: AccountTestProps[];
};

type AccountTestProps = {
   id: number;
   title: string;
   points: number;
   receivedPoints: number;
};

const getAccount = (id: number) => async () => {
   const { data }: { data: AccountProps } = await learnAPI.get(
      `/account/${id}`
   );
   return data;
};

export { currentUser, loginUser, createUser, getAccount };

export type { UserContextProps, loginUserType, createUserType, AccountProps, AccountTestProps };
