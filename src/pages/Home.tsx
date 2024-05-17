import { useQuery } from "@tanstack/react-query";
import Lesson from "../components/Lesson";
import { getLessons } from "../queries/lessonQueries";
import Spinner from "../components/Spinner";

function Home() {
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`lessons`],
      queryFn: getLessons
   });

   let htm: JSX.Element = <Spinner height="4.5rem" />;

   if (isPending) htm = <Spinner height="4.5rem" />;
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
            {data.map((lsn) => (
               <Lesson id={lsn.id} num={lsn.num} title={lsn.title} />
            ))}
         </>
      );

   return (
      <div className="container mx-auto p-4">
         <h1 className="text-center text-4xl mt-4">Уроки</h1>
         <div className="max-w-[80ch] mx-auto mt-8 flex flex-col gap-4 items-center">
            {htm}
         </div>
      </div>
   );
}

export default Home;
