import { ReactNode } from "react";
import { Theory } from "./Theory";
import { Test } from "./Test";
import { useSearchParams } from "react-router-dom";
import { LessonProps, LessonExpandProps } from "../queries/lessonQueries";

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
      <div className="border border-white bg-slate-700 rounded-lg">
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
   // const { isPending, isError, data, error } = useQuery({
   //    queryKey: [`lesson/${id}`],
   //    queryFn: getLesson(id)
   // });
   return (
      <div className="p-4 flex justify-around gap-4" data-id={id}>
         <ExpandColumn>
            <Theory id={2} title="variables" />
            <Theory id={3} title="let/const" />
            <Theory id={4} title="JS type coercion" />
         </ExpandColumn>
         <ExpandColumn>
            <Test id={5} title="Модульний тест" questionsAmount={6} />
            <Test id={6} title="Семестровий тест" questionsAmount={2} />
         </ExpandColumn>
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
