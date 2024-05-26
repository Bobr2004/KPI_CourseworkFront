import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRating } from "../queries/userQueries";
import Spinner from "../components/Spinner";
import AccountRating from "../components/accountComponents/AccountRating";

function Rating() {
   const [searchParams, setSearchParams] = useSearchParams({
      sort: "score"
   });

   const { isPending, isError, data, error } = useQuery({
      queryKey: [`rating`],
      queryFn: getRating(searchParams.get("sort"))
   });

   let htm: JSX.Element;

   if (isPending) htm = <div className="flex justify-center"><Spinner height="4.5rem" /></div>;
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
         oleg  
            {/* {data && data.map((acc,i) => (
               <AccountRating key={i} seq={i}{...acc} />
            ))} */}
         </>
      );

   return (
      <div className="container mx-auto p-4 md:mt-8">
         <h1 className="max-w-[80ch] mx-auto text-center text-4xl">Рейтинг</h1>
         <div className="max-w-[80ch] mx-auto mt-8">{htm}</div>
      </div>
   );
}

export default Rating;
