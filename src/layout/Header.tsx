import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";

function Header() {
   return (
      <header className="p-4 bg-slate-800 border-b border-white">
         <div className="container mx-auto flex justify-between">
            <NavLink to={routes.home}>Logo</NavLink>
            <NavLink to={routes.log}>Cabin</NavLink>
         </div>
      </header>
   );
}

export default Header;
