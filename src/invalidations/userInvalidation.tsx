import { QueryClient } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { routes } from "../config/routes";
import { wait } from "../helpers/helpers";

const patchUserOnSuccess = (queryClient: QueryClient, id: number) => {
   queryClient.invalidateQueries({ queryKey: ["current-user"] });
   queryClient.invalidateQueries({ queryKey: [`account/${id}`] });
};

const authUserOnSuccess = (
   queryClient: QueryClient,
   id: number,
   redirect: NavigateFunction
) => {
   queryClient.invalidateQueries({ queryKey: ["current-user"] });
   redirect(routes.toAccount(id));
};

const leaveUserOnSuccess = (
   queryClient: QueryClient,
   redirect: NavigateFunction
) => {
   queryClient.invalidateQueries({ queryKey: ["current-user"] });
   wait().then(() => redirect(routes.log));
};

// const onSuccessToHome = (redirect: NavigateFunction) => {
//    redirect(routes.home);
// };

export { patchUserOnSuccess, authUserOnSuccess, leaveUserOnSuccess };
