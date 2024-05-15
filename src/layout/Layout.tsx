import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

function Layout() {
   return (
      <div className="wrapper flex flex-col">
         <Header />
         <Main>
            <Outlet />
         </Main>
      </div>
   );
}

export default Layout;
