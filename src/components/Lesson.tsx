import { ReactNode } from "react";
import { Theory } from "./Theory";
import { Test } from "./Test";
import { useSearchParams } from "react-router-dom";
import { LessonProps, getLesson } from "../queries/lessonQueries";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

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
      <div className="border border-white bg-slate-700 rounded-lg w-full">
         <div className="rounded-lg bg-slate-800 border border-white flex justify-between p-4">
            <div>{num}</div>
            <div>{title}</div>
            <button
               onClick={toggleExpand}
               className="border border-white rounded-lg px-2"
            >
               більше
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
                  <Theory id={id} title={title} />
               ))}
            </ExpandColumn>
            <ExpandColumn>
               {testList.map(({ id, title, questionsAmount }) => (
                  <Test
                     id={id}
                     title={title}
                     questionsAmount={questionsAmount}
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
