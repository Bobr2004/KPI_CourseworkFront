import { NavLink } from "react-router-dom";
import { AccountRatingProps } from "../../queries/userQueries";
import { routes } from "../../config/routes";
import "./account.scss";
import { properPointsWord } from "../../helpers/helpers";
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
            <span className="hidden sm:block">{firstName}</span>
            <span>{lastName}</span>
         </div>

         <p className="hidden sm:block">
            Бал: {score ? <b>{score}</b> : <b> - </b>}
         </p>

         <p className="block sm:hidden">
            {score ? <b>{score} {properPointsWord(score)}</b> : <b> - </b>} 
         </p>
         <p>
            <span className="hidden sm:inline">Bстигаємість:</span>{" "}
            {performance ? (
               <b
                  className={
                     performance >= 60 ? " text-green-500" : "text-red-500"
                  }
               >
                  {performance}%
               </b>
            ) : (
               <b>-</b>
            )}
         </p>
      </NavLink>
   );
}

export default AccountRating;
