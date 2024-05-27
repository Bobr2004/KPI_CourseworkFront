import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { TheoryProps } from "../queries/lessonQueries";
import { useUser } from "../contexts/UserContext";
import { useMemo } from "react";
import DeleteElement from "./DeleteElement";
import { useModal } from "../contexts/ModalContext";

function Theory({ id, title }: TheoryProps) {
   const  modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   return (
      <article className="relative ">
         {isEdit && <DeleteElement
               onClick={() =>
                  modals?.openModal({
                     subject: "element",
                     data: { element: "theory", id },
                     action: "delete"
                  })
               }
            />}
         <NavLink
            to={routes.toTheory(id)}
            className="block bg-stone-100 rounded-lg p-2 hover-stone-cs ease-test"
         >
            <h3>{title}</h3>
         </NavLink>
      </article>
   );
}

export { Theory };
