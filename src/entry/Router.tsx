import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../config/routes";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import TheoryPage from "../pages/TheoryPage";
import TestPage from "../pages/TestPage";
import Account from "../pages/Account";
import Rating from "../pages/Rating";
import { ModalContextProvider } from "../contexts/ModalContext";

function Router() {
   return (
      <BrowserRouter>
         <ModalContextProvider>
            <Routes>
               <Route path={routes.home} element={<Layout />}>
                  <Route path={routes.home} element={<Home />} />

                  <Route path={routes.rating} element={<Rating />} />

                  <Route path={routes.reg} element={<Registration />} />
                  <Route path={routes.log} element={<Login />} />

                  <Route path={routes.account} element={<Account />} />

                  <Route path={routes.theory} element={<TheoryPage />} />
                  <Route path={routes.test} element={<TestPage />} />
               </Route>
            </Routes>
         </ModalContextProvider>
      </BrowserRouter>
   );
}

export default Router;
