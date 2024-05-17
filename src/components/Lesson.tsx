import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { LessonProps, getLesson } from "../queries/lessonQueries";
import Spinner from "./Spinner";
import { Test } from "./Test";
import { Theory } from "./Theory";

// Lesson num - sequence number

function Lesson({ id, num, title }: LessonProps) {
   const [searchParams, setSearchParams] = useSearchParams();
   let isExpanded;
   if (searchParams.get(`expanded_${id}`)) {
      console.log(Boolean(searchParams.get(`expanded_${id}`)));
      isExpanded = Boolean(searchParams.get(`expanded_${id}`));
   } else isExpanded = false;

   const toggleExpand = () => {
      if (!isExpanded) searchParams.set(`expanded_${id}`, String(!isExpanded));
      else searchParams.delete(`expanded_${id}`);
      setSearchParams(searchParams);
   };

   return (
      <div className="border border-stone-600 bg-stone-200 rounded-lg w-full overflow-hidden">
         <div className=" bg-stone-300 border-b border-stone-600 p-4 relative">
            <div className="absolute top-4 left-4">{num}</div>
            <h2 className="text-center">{title}</h2>
            <button
               onClick={toggleExpand}
               className="absolute top-4 right-4 px-2 hover-button-cs"
            >
               Ø
            </button>
         </div>
         {isExpanded && <LessonExpand id={id} />}
      </div>
   );
}

function LessonExpand({ id }: { id: number }) {
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`lesson/${id}`],
      queryFn: getLesson(id)
   });

   let htm: JSX.Element = <Spinner height="3rem" />;

   if (isPending) htm = <Spinner height="3rem" />;
   else if (isError) htm = <div>Error: {error.message}</div>;
   else {
      const { theoryList, testList } = data;
      htm = (
         <>
            <ExpandColumn>
               {theoryList.map(({ id, title }) => (
                  <Theory id={id} title={title} key={id} />
               ))}
            </ExpandColumn>
            <ExpandColumn>
               {testList.map(({ id, title, questionsAmount, points }) => (
                  <Test
                     id={id}
                     title={title}
                     questionsAmount={questionsAmount}
                     points={points}
                     key={id}
                  />
               ))}
            </ExpandColumn>
         </>
      );
   }

   // const { isPending, isError, data, error } = useQuery({
   //    queryKey: [`lesson/${id}`],
   //    queryFn: getLesson(id)
   // });
   return (
      <div className="p-4 flex justify-around gap-4" data-id={id}>
         {htm}
      </div>
   );
}

type ExpandColumnProps = {
   children: ReactNode;
};

function ExpandColumn({ children }: ExpandColumnProps) {
   return <div className="flex flex-col gap-2 p-2 w-1/2">{children}</div>;
}

export default Lesson;
