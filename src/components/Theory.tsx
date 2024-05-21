import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { TheoryProps } from "../queries/lessonQueries";

function Theory({ id, title }: TheoryProps) {
   return (
      <article>
         <NavLink
            to={routes.toTheory(id)}
            className="block bg-stone-200 rounded-lg p-2 hover-stone-cs "
         >
            <h3>{title}</h3>
         </NavLink>
      </article>
   );
}

export { Theory };
