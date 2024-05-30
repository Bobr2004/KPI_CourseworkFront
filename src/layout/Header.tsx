import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { useUser } from "../contexts/UserContext";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faChartSimple,
   faEye,
   faGear,
   faHouse,
   faUser
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

function Header() {
   const currentUser = useUser();
   const isAdmin = useMemo(
      () => currentUser?.role === "admin",
      [currentUser?.role]
   );
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);

   let htm: JSX.Element;

   if (currentUser === undefined) htm = <Spinner height="1.5rem" />;
   else if (currentUser === null)
      htm = <NavLink to={routes.log}>Увійти</NavLink>;
   else
      htm = (
         <div className="flex gap-4">
            {isAdmin && (
               <>
                  {isEdit ? (
                     <button
                        className="hover-stone-cs px-2 -my-px"
                        onClick={currentUser.exitEditMode}
                        title="Режим перегляду"
                     >
                        <FontAwesomeIcon icon={faEye} />
                     </button>
                  ) : (
                     <button
                        className="hover-stone-cs px-2 -my-px"
                        onClick={currentUser.enterEditMode}
                        title="Режим редаугвання"
                     >
                        <FontAwesomeIcon icon={faGear} />
                     </button>
                  )}
               </>
            )}
            <NavLink to={routes.toAccount(currentUser.id)}>
               {currentUser.firstName} <FontAwesomeIcon icon={faUser} />
            </NavLink>
         </div>
      );

   return (
      <header className="p-4 bg-stone-200 border-b border-stone-600">
         <div className="container mx-auto flex justify-between">
            <div className="flex gap-4">
               {/* <NavLink to={routes.home}>Logo</NavLink> */}
               <NavLink to={routes.home}>
                  Головна <FontAwesomeIcon icon={faHouse} />
               </NavLink>
               <NavLink to={routes.rating}>
                  Рейтинг <FontAwesomeIcon icon={faChartSimple} />
               </NavLink>
            </div>
            {htm}
         </div>
      </header>
   );
}

export default Header;
