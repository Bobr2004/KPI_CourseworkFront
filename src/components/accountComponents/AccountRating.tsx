import { AccountRatingProps } from "../../queries/userQueries";

function AccountRating({
   id,
   firstName,
   lastName,
   score,
   performance,
   seq
}: AccountRatingProps & { seq: number }) {
   return <div></div>;
}

export default AccountRating;
