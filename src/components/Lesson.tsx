import { useQuery } from "@tanstack/react-query";
import { ReactNode, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LessonProps, getLesson } from "../queries/lessonQueries";
import Spinner from "./Spinner";
import { Test } from "./Test";
import { Theory } from "./Theory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../contexts/UserContext";
import DeleteElement from "./DeleteElement";
import EditElement from "./EditElement";
import { useModal } from "../contexts/ModalContext";

// Lesson num - sequence number

function Lesson({ id, num, title }: LessonProps) {
   const modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   const [searchParams, setSearchParams] = useSearchParams();
   let isExpanded;
   if (searchParams.get(`expanded_${id}`)) {
      isExpanded = Boolean(searchParams.get(`expanded_${id}`));
   } else isExpanded = false;

   const toggleExpand = () => {
      if (!isExpanded) searchParams.set(`expanded_${id}`, String(!isExpanded));
      else searchParams.delete(`expanded_${id}`);
      setSearchParams(searchParams);
   };

   return (
      <div className="border border-stone-600 bg-stone-100 rounded-t-lg w-full">
         <div className=" bg-stone-100 border-b border-stone-600 p-4 rounded-t-lg relative">
            {isEdit && (
               <DeleteElement
                  onClick={() =>
                     modals?.openModal({
                        subject: "element",
                        data: { element: "lesson", id, invalidate: "lessons" },
                        action: "delete"
                     })
                  }
               />
            )}
            <div className="absolute top-4 left-4">{num}</div>
            <div className="flex justify-center">
               <h2 className="text-center relative ">
                  {isEdit && (
                     <EditElement
                        onClick={() =>
                           modals?.openModal({
                              subject: "element",
                              data: { element: "lesson", id, title },
                              action: "patch"
                           })
                        }
                     />
                  )}
                  {title}
               </h2>
            </div>

            <button
               onClick={toggleExpand}
               className="absolute top-4 right-4 px-2 hover-button-cs"
            >
               {isExpanded ? (
                  <FontAwesomeIcon icon={faCaretUp} />
               ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
               )}
            </button>
         </div>
         {isExpanded && <LessonExpand id={id} />}
      </div>
   );
}

function LessonExpand({ id: parentId }: { id: number }) {
   const [category, setCategory] = useState(0);
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`lesson/${parentId}`],
      queryFn: getLesson(parentId)
   });

   let htm: JSX.Element;

   if (isPending)
      htm = (
         <div className="flex justify-center pt-2  pb-2">
            <Spinner height="3rem" />
         </div>
      );
   else if (isError)
      htm = (
         <div className="flex justify-center pt-2  pb-2">
            Error: {error.message}
         </div>
      );
   else {
      const { theoryList, testList } = data;
      htm = (
         <>
            <ExpandCategories {...{ category, setCategory }} />
            <div className="max-h-[300px] overflow-y-scroll overflow-x-hidden">
               <div
                  className=" pt-2 pb-2 sm:pt-0 sm:px-4 flex justify-around transition-all sm:!translate-x-0"
                  style={{ transform: `translate(${category * -100}%,0)` }}
               >
                  <ExpandColumn>
                     {theoryList.map(({ id, title }) => (
                        <Theory id={id} title={title} key={id} parentId={parentId}/>
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
                           parentId={parentId}
                        />
                     ))}
                  </ExpandColumn>
               </div>
            </div>
         </>
      );
   }

   // const { isPending, isError, data, error } = useQuery({
   //    queryKey: [`lesson/${id}`],
   //    queryFn: getLesson(id)
   // });
   return (
      <div className="flex flex-col" data-id={parentId}>
         {htm}
      </div>
   );
}

function ExpandCategories({
   category,
   setCategory
}: {
   category: number;
   setCategory: React.Dispatch<React.SetStateAction<number>>;
}) {
   const setTheory = () => {
      setCategory(0);
   };

   const setTest = () => {
      setCategory(1);
   };

   return (
      <>
         <div className="flex sm:hidden border-b border-stone-600">
            <button
               onClick={setTheory}
               className={`w-1/2 py-1 ${
                  !category ? "activeCategory" : ""
               } px-2`}
            >
               Теорія
            </button>
            <button
               onClick={setTest}
               className={`w-1/2 py-1 ${category ? "activeCategory" : ""} px-2`}
            >
               Тести
            </button>
         </div>
         <div className="hidden sm:flex">
            <p className="w-1/2 text-center py-1 px-2">Теорія</p>
            <p className="w-1/2 text-center py-1 px-2">Тести</p>
         </div>
      </>
   );
}

type ExpandColumnProps = {
   children: ReactNode;
};

function ExpandColumn({ children }: ExpandColumnProps) {
   return (
      <div className="flex flex-col gap-2 p-2 w-full flex-shrink-0 sm:w-1/2 sm:flex-shrink">
         {children}
      </div>
   );
}

export default Lesson;
