import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { UserContextProvider } from "../contexts/UserContext";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <UserContextProvider>
            <Router />
         </UserContextProvider>
      </QueryClientProvider>
   );
}

export default App;
