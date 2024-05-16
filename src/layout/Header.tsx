import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { useUser } from "../contexts/UserContext";
import Spinner from "../components/Spinner";

function Header() {
   const currentUser = useUser();

   let htm: JSX.Element;

   if (currentUser === undefined) htm = <Spinner height="1.5rem"/>;
   else if (currentUser === null)
      htm = <NavLink to={routes.log}>Cabin</NavLink>;
   else htm = (
      <NavLink to={routes.toAccount(currentUser.id)}>
         {currentUser.firstName}
      </NavLink>
   );

   return (
      <header className="p-4 bg-slate-800 border-b border-white">
         <div className="container mx-auto flex justify-between">
            <NavLink to={routes.home}>Logo</NavLink>
            {htm}
         </div>
      </header>
   );
}

export default Header;
