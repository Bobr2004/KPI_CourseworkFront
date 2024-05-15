import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";

type TheoryProps = {
   id: number;
   title: string;
};

function Theory({ id, title }: TheoryProps) {
   return (
      <article>
         <NavLink
            to={routes.toTheory(id)}
            className="block bg-slate-800 rounded-lg p-2"
         >
            <h3>{title}</h3>
         </NavLink>
      </article>
   );
}

export { Theory };

export type { TheoryProps };
