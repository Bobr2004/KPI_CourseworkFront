import { NavLink } from "react-router-dom";
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

function Test({ id, title, questionsAmount, points }: TestProps) {
   const  modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   let testLevel: "ease" | "mid" | "hard" = "ease";
   if (questionsAmount > 5) testLevel = "mid";
   if (questionsAmount > 15) testLevel = "hard";
   return (
      <article className="relative">
         {isEdit && (
            <DeleteElement
               onClick={() =>
                  modals?.openModal({
                     subject: "element",
                     data: { element: "test", id },
                     action: "delete"
                  })
               }
            />
         )}
         <NavLink
            to={routes.toTest(id)}
            className={`flex flex-col items-stretch hard-test gap-1 p-2 hover-stone-cs`}
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
         </NavLink>
      </article>
   );
}

export { Test };
