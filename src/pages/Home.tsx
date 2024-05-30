import { useQuery } from "@tanstack/react-query";
import Lesson from "../components/Lesson";
import { getLessons } from "../queries/lessonQueries";
import Spinner from "../components/Spinner";
import { useUser } from "../contexts/UserContext";
import { useMemo } from "react";
import PostElement from "../components/PostElement";

function Home() {
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);

   const { isPending, isError, data, error } = useQuery({
      queryKey: [`lessons`],
      queryFn: getLessons
   });

   let htm: JSX.Element;

   if (isPending) htm = <Spinner height="4.5rem" />;
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
            {data &&
               data.map((lsn, i) => (
                  <Lesson
                     id={lsn.id}
                     num={i + 1}
                     title={lsn.title}
                     key={lsn.id}
                  />
               ))}
         </>
      );

   return (
      <div className="container mx-auto p-4 md:mt-8">
         <h1 className="text-center text-4xl">Теми</h1>
         <div className="max-w-[80ch] mx-auto mt-8 flex flex-col gap-4 items-center">
            {htm}
         </div>
         {isEdit && <PostElement />}
      </div>
   );
}

export default Home;
