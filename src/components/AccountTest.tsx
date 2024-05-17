import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { AccountTestProps } from "../queries/userQueries";

function AccountTest({ id, title, points, receivedPoints }: AccountTestProps) {
   const isEnough = receivedPoints > Math.floor(points * 0.6);

   let testStatus: "failed" | "success" = isEnough
      ? "success"
      : "failed";

   return (
      <article>
         <NavLink
            to={routes.toTest(id)}
            className={`flex gap-4 justify-between bg-stone-300 p-2 hover-${testStatus}-cs hover-${testStatus}-bg-cs`}
         >
            <h3>{title}</h3>
            <span>
               {receivedPoints}/{points}
            </span>
         </NavLink>
      </article>
   );
}

export { AccountTest };
