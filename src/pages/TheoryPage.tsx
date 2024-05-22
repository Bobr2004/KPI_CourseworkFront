import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTheory } from "../queries/lessonQueries";
import Spinner from "../components/Spinner";
import { useEffect, useRef } from "react";

function TheoryPage() {
   const { id } = useParams();
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`theory/${id}`],
      queryFn: getTheory(Number(id))
   });

   const htmlDiv = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (data?.html && htmlDiv.current) {
         htmlDiv.current.innerHTML = data.html;
      }
   }, [data]);

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
            <h1 className="max-w-[80ch] mx-auto text-center text-4xl">
               {data.lessonTitle} ({data.title})
            </h1>
            <div
               className="max-w-[80ch] mx-auto mt-8 flex flex-col gap-3 theoryHtml"
               ref={htmlDiv}
            ></div>
            <h5 className="max-w-[80ch] mx-auto text-end mt-2">
               <em>Автор: {data.author}</em>
            </h5>
         </>
      );
   return <div className="container mx-auto p-4 md:mt-8">{htm}</div>;
}

export default TheoryPage;
