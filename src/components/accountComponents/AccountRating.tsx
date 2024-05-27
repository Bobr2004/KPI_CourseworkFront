import { NavLink } from "react-router-dom";
import { AccountRatingProps } from "../../queries/userQueries";
import { routes } from "../../config/routes";
import "./account.scss";
function AccountRating({
   id,
   firstName,
   lastName,
   score,
   performance,
   seq
}: AccountRatingProps & { seq: number }) {
   return (
      <NavLink
         to={routes.toAccount(id)}
         className="hover-stone-cs p-4 bg-stone-100 account-rating"
      >
         <div>{seq}</div>
         <div className="flex gap-2">
            <span>{firstName}</span>
            <span>{lastName}</span>
         </div>

         <div>
            Балл: <b>{score}</b>
         </div>
         <div>
            Встигаємість:{" "}
            <b
               className={performance >= 60 ? "text-green-500" : "text-red-500"}
            >
               {performance}%
            </b>
         </div>
      </NavLink>
   );
}

export default AccountRating;
