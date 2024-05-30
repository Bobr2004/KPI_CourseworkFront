import { useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { TestProps } from "../queries/lessonQueries";
import {
   coreDigit,
   properPointsWord,
   properQuestionsWord
} from "../helpers/helpers";
import { useUser } from "../contexts/UserContext";
import { useMemo } from "react";
import DeleteElement from "./DeleteElement";
import { useModal } from "../contexts/ModalContext";

function Test({
   id,
   title,
   questionsAmount,
   points,
   parentId
}: TestProps & { parentId: number }) {
   const redirect = useNavigate();
   const modals = useModal();
   const currentUser = useUser();

   console.log("Test, parentID", parentId);

   const onClick = () => {
      if (
         currentUser?.testList &&
         currentUser?.testList.find((el) => el.id === id)
      ) {
         modals?.openModal({
            subject: "test",
            data: { testId: id },
            action: "passed"
         });
         return;
      } else redirect(routes.toTest(id));
   };

   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);

   return (
      <article className="relative">
         {isEdit && (
            <DeleteElement
               onClick={() =>
                  modals?.openModal({
                     subject: "element",
                     data: {
                        element: "test",
                        id,
                        invalidate: `lesson/${parentId}`
                     },
                     action: "delete"
                  })
               }
            />
         )}
         <button
            onClick={onClick}
            className={`flex flex-col items-stretch hard-test gap-1 p-2 hover-stone-cs w-full`}
         >
            <h3 className="text-center">{title}</h3>
            <div className="divider-cs"></div>
            <div className="flex gap-4 justify-around flex-wrap">
               <p>
                  {questionsAmount}{" "}
                  {properQuestionsWord(coreDigit(questionsAmount))}
               </p>
               <p>
                  {points} {properPointsWord(coreDigit(points))}
               </p>
            </div>
         </button>
      </article>
   );
}

export { Test };
