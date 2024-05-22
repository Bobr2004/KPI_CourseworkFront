import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { TheoryProps } from "../queries/lessonQueries";
import { useUser } from "../contexts/UserContext";
import { useMemo } from "react";
import DeleteElement from "./DeleteElement";

function Theory({ id, title }: TheoryProps) {
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   return (
      <article className="relative">
         {isEdit && <DeleteElement />}
         <NavLink
            to={routes.toTheory(id)}
            className="block bg-stone-100 rounded-lg p-2 hover-stone-cs "
         >
            <h3>{title}</h3>
         </NavLink>
      </article>
   );
}

export { Theory };
