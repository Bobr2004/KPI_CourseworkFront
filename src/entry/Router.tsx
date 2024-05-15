import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../config/routes";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import TheoryPage from "../pages/TheoryPage";
import TestPage from "../pages/TestPage";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route path={routes.home} element={<Home />} />
               <Route path={routes.reg} element={<Registration />} />
               <Route path={routes.log} element={<Login />} />
               <Route path={routes.theory} element={<TheoryPage/>} />
               <Route path={routes.test} element={<TestPage />} />
               <Route path={routes.account} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
