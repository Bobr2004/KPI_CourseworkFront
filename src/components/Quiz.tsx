import { useMemo } from "react";
import { useModal } from "../contexts/ModalContext";
import { useUser } from "../contexts/UserContext";
import { QuizProps } from "../queries/lessonQueries";
import DeleteElement from "./DeleteElement";
import { properPointsWord } from "../helpers/helpers";

function Quiz({
   id,
   question,
   optionA,
   optionB,
   optionC,
   points,
   choose,
   parentId
}: QuizProps & {
   choose: (id: number, value: string) => void;
   parentId: number;
}) {
   const modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);

   const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
      choose(id, e.target.value);
   };
   return (
      <div className="relative">
         {isEdit && (
            <DeleteElement
               onClick={() =>
                  modals?.openModal({
                     subject: "element",
                     data: {
                        element: "quiz",
                        id,
                        invalidate: `test/${parentId}`
                     },
                     action: "delete"
                  })
               }
            />
         )}
         <div className="bg-stone-100 hover-stone-cs p-4">
            <div className="flex justify-between gap-2 ">
               <h3>{question}</h3>{" "}
               <p>
                  {points} {properPointsWord(points)}
               </p>
            </div>
            <div>
               <label className="flex gap-2">
                  <input
                     type="radio"
                     name={`${id}`}
                     value="OptionA"
                     onChange={handleChoose}
                  />
                  <span>{optionA}</span>
               </label>
            </div>
            <div>
               <label className="flex gap-2">
                  <input
                     type="radio"
                     name={`${id}`}
                     value="OptionB"
                     onChange={handleChoose}
                  />
                  <span>{optionB}</span>
               </label>
            </div>
            <div>
               <label className="flex gap-2">
                  <input
                     type="radio"
                     name={`${id}`}
                     value="OptionC"
                     onChange={handleChoose}
                  />
                  <span>{optionC}</span>
               </label>
            </div>
         </div>
      </div>
   );
}

export { Quiz };
