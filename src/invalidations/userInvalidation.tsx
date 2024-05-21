import { QueryClient } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { routes } from "../config/routes";

const patchUserOnSuccess = (queryClient: QueryClient, id: number) => {
   queryClient.invalidateQueries({ queryKey: ["current-user"] });
   queryClient.invalidateQueries({ queryKey: [`account/${id}`] });
};

const authUserOnSuccess = (queryClient: QueryClient, id: number, redirect: NavigateFunction)=>{
   queryClient.invalidateQueries({ queryKey: ["current-user"] });
   redirect(routes.toAccount(id));
}


const onSuccessToHome = (redirect: NavigateFunction)=>{
   redirect(routes.home);
}


export {patchUserOnSuccess, authUserOnSuccess, onSuccessToHome};