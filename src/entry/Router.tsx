import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "../config/routes"
import Layout from "../layout/Layout"

function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={routes.home} element={<Layout/>}>
         <Route path={routes.home} element={<>Diman</>}/>
         <Route path={routes.reg}/>
         <Route path={routes.log}/>
         <Route path={routes.account(23)}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router