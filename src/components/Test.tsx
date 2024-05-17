import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { TestProps } from "../queries/lessonQueries";

function Test({ id, title, questionsAmount, points }: TestProps) {
   const properQuestionsWord = (num: number): string => {
      if ([1, 2, 3, 4].includes(num)) return "питання";
      return "питань";
   };

   const properPointsWord = (num: number): string => {
      if (num === 1) return "бал";
      if ([2, 3, 4].includes(num)) return "бали";
      return "балів";
   };

   const coreDigit = (num: number): number => {
      if (num % 100 > 10 && num % 100 <= 20) return num % 100;
      return num % 10;
   };


   console.log(points)
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
               <p>{points} {properPointsWord(coreDigit(points))}</p>
            </div>
         </NavLink>
      </article>
   );
}

export { Test };
