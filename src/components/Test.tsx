import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";

type TestProps = {
   id: number;
   title: string;
   questionsAmount: number;
};

function Test({ id, title, questionsAmount }: TestProps) {
   return (
      <article>
         <NavLink
            to={routes.toTest(id)}
            className="flex justify-between bg-slate-800 rounded-lg p-2"
         >
            <h3>{title}</h3>
            <p>{questionsAmount} питань</p>
         </NavLink>
      </article>
   );
}

export { Test };

export type { TestProps };
