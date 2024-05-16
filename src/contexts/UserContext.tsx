import { ReactNode, createContext, useContext } from "react";
import { UserContextProps, currentUser } from "../queries/userQueries";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext<UserContextProps | null | undefined>(null);

function UserContextProvider({ children }: { children: ReactNode }) {
   const { isPending, isError, data} = useQuery({
      queryKey: [`currentUser`],
      queryFn: currentUser
   });

   let contextData: UserContextProps | null | undefined = null;

   if (isPending) contextData = undefined;
   else if (isError) contextData = null;
   else if (data) contextData = data;

   return (
      <UserContext.Provider value={contextData}>
         {children}
      </UserContext.Provider>
   );
}

const useUser = () => {
   return useContext(UserContext);
};

export { UserContextProvider, useUser };
