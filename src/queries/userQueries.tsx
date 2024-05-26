import { learnAPI, learnCredintialsAPI } from "../config/serverConfig";

// SEND JWT cookie and GET current user data (for global context)
type UserContextProps = {
   id: number;
   role: string;
   firstName: string;
   lastName: string;
};

const currentUser = async () => {
   const { data }: { data: UserContextProps } = await learnCredintialsAPI.get(
      `/current-user`
   );
   return data;
};
//

// Get user rating score - overall points; performance - %
type RatingProps = AccountRatingProps[];
type AccountRatingProps = {
   id: number;
   firstName: string;
   lastName: string;
   score: number;
   performance: number;
};

type sortType = "performance" | "score";

const getRating = (sort: string | null) => async () => {
   const { data }: { data: RatingProps } = await learnAPI.get(`/rating`, {
      params: {
         sort
      }
   });
   return data;
};
//

// GET all data about SPECIFIC User
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
//

const getAccount = (id: number) => async () => {
   const { data }: { data: AccountProps } = await learnAPI.get(
      `/account/${id}`
   );
   return data;
};

export { currentUser, getAccount, getRating };

export type {
   UserContextProps,
   AccountProps,
   AccountTestProps,
   RatingProps,
   AccountRatingProps
};
