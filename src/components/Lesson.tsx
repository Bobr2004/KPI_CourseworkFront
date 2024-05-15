import { useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { Theory, TheoryProps } from "./Theory";
import { Test, TestProps } from "./Test";

type LessonProps = {
   id: number;
   num: number;
   title: string;
};

// Lesson num - sequence number

function Lesson({ id, num, title }: LessonProps) {
   const [isExpanded, setIsExpaned] = useState(false);
   return (
      <div className="border border-white bg-slate-700 rounded-lg">
         <div className="rounded-lg bg-slate-800 border border-white flex justify-between p-4">
            <div>{num}</div>
            <div>{title}</div>
            <button onClick={() => setIsExpaned((e) => !e)} className="border border-white rounded-lg px-2">більше</button>
         </div>
         {isExpanded && <LessonExpand id={id} />}
      </div>
   );
}

type LessonExpandData = {
   theoryList: TheoryProps[];
   testList: TestProps[];
};

function LessonExpand({ id }: { id: number }) {
   // const { isPending, isError, data, error } = useQuery({
   //    queryKey: [`lesson/${id}`],
   //    queryFn:
   // });

   return (
      <div className="p-4 flex justify-around gap-4">
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
