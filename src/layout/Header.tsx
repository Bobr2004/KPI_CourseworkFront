import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";

function Header() {
   return (
      <header className="p-4 bg-neutral-800">
         <div className="container mx-auto flex justify-between">
            <NavLink to={routes.home}>Logo</NavLink>
            <NavLink to={routes.reg}>Cabin</NavLink>
         </div>
      </header>
   );
}

export default Header;
