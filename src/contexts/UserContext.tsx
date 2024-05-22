import {
   ReactNode,
   createContext,
   useContext,
   useEffect,
   useState
} from "react";
import { UserContextProps, currentUser } from "../queries/userQueries";
import { useQuery } from "@tanstack/react-query";

type UserContextPropsExtend = UserContextProps & {
   exitEditMode: () => void;
   enterEditMode: () => void;
   editMode: boolean;
};

const UserContext = createContext<UserContextPropsExtend | null | undefined>(
   null
);

function UserContextProvider({ children }: { children: ReactNode }) {
   const { isPending, isError, data } = useQuery({
      queryKey: [`current-user`],
      queryFn: currentUser
   });

   const [editMode, setEditMode] = useState(false);

   useEffect(() => {
      setEditMode(false);
   }, [data]);

   let contextData: UserContextPropsExtend | null | undefined = null;

   const exitEditMode = () => {
      setEditMode(false);
   };

   const enterEditMode = () => {
      setEditMode(true);
   };

   if (isPending) contextData = undefined;
   else if (isError) contextData = null;
   else if (data)
      contextData = { ...data, exitEditMode, enterEditMode, editMode };

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
