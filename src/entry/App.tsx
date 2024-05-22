import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { UserContextProvider } from "../contexts/UserContext";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalContextProvider } from "../contexts/ModalContext";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <UserContextProvider>
            <ModalContextProvider>
               <Router />
            </ModalContextProvider>
         </UserContextProvider>
         <ReactQueryDevtools />
      </QueryClientProvider>
   );
}

export default App;
