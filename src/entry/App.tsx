import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { UserContextProvider } from "../contexts/UserContext";

import { ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <UserContextProvider>
            <Router />
         </UserContextProvider>
         <ReactQueryDevtools/>
      </QueryClientProvider>
   );
}

export default App;
