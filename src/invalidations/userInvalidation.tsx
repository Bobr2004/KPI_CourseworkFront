import { QueryClient } from "@tanstack/react-query";

const patchUserInvalidations = (queryClient: QueryClient, id: number) => {
   queryClient.invalidateQueries({ queryKey: ["current-user"] });
   queryClient.invalidateQueries({ queryKey: [`account/${id}`] });
};


export {patchUserInvalidations};