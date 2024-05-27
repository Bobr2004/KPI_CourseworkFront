import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRating } from "../queries/userQueries";
import Spinner from "../components/Spinner";
import AccountRating from "../components/accountComponents/AccountRating";
import { useEffect } from "react";

function Rating() {
   const [searchParams, setSearchParams] = useSearchParams();
   const queryClient = useQueryClient();

   const { isPending, isError, data, error } = useQuery({
      queryKey: [`rating`],
      queryFn: getRating(searchParams.get("sort"))
   });

   useEffect(() => {
      console.log("oleg");
      queryClient.invalidateQueries({ queryKey: ["rating"] });
   }, [searchParams]);

   let htm: JSX.Element;

   if (isPending)
      htm = (
         <div className="flex justify-center">
            <Spinner height="4.5rem" />
         </div>
      );
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
            <div className="flex gap-2 justify-end items-center">
               <span>Сортування </span>
               <select
                  className="hover-stone-cs py-1 px-2"
                  defaultValue={searchParams.get("sort") || "score"}
                  onChange={(e) => {
                     setSearchParams({
                        sort: e.target.value
                     });
                  }}
               >
                  <option value="score">Балл</option>
                  <option value="performance">Встигаємість</option>
               </select>
            </div>
            {data &&
               data.map((acc, i) => (
                  <AccountRating key={acc.id} seq={i + 1} {...acc} />
               ))}
         </>
      );

   return (
      <div className="container mx-auto p-4 md:mt-8">
         <h1 className="max-w-[80ch] mx-auto text-center text-4xl">Рейтинг</h1>
         <div className="max-w-[80ch] mx-auto mt-8 flex flex-col gap-4">
            {htm}
         </div>
      </div>
   );
}

export default Rating;
