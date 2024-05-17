import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { TestProps } from "../queries/lessonQueries";
import { coreDigit, properPointsWord, properQuestionsWord } from "../helpers/helpers";

function Test({ id, title, questionsAmount, points }: TestProps) {
   return (
      <article>
         <NavLink
            to={routes.toTest(id)}
            className="flex flex-col items-stretch bg-stone-300 gap-1 p-2 hover-stone-cs hover-bg-cs"
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
