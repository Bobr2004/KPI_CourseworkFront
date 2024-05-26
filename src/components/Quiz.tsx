import { useMemo } from "react";
import { useModal } from "../contexts/ModalContext";
import { useUser } from "../contexts/UserContext";
import { QuizProps } from "../queries/lessonQueries";
import DeleteElement from "./DeleteElement";

function Quiz({
   id,
   question,
   optionA,
   optionB,
   optionC,
   points,
   choose
}: QuizProps & { choose: (id: number, value: string) => void }) {
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
                     data: { element: "quiz", id },
                     action: "delete"
                  })
               }
            />
         )}
         <div className="bg-stone-200 hover-stone-cs">
            <div className="flex justify-between gap-2">
               <h3>{question}</h3> <p>{points}</p>
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
