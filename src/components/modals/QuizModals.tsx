import { useMutation } from "@tanstack/react-query";
import ModalTemplate from "./ModalTemplate";
import StatusButton from "../StatusButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { postQuiz } from "../../mutations/adminTestMutations";
import CompactInput from "../CompactInput";

function QuizPostSubmit({
   close,
   parentTestId
}: {
   close: () => void;
   parentTestId: number;
}) {
   const [question, setQuestion] = useState("");
   const [optionA, setOptionA] = useState("");
   const [optionB, setOptionB] = useState("");
   const [optionC, setOptionC] = useState("");
   const [points, setPoints] = useState(1);

   const [correctOption, setCorrectOption] = useState("OptionA");

   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({ mutationFn: postQuiz });

   const submit = () => {
      mutate({
         parentTestId,
         question,
         optionA,
         optionB,
         optionC,
         correctOption,
         points
      });
   };
   return (
      <ModalTemplate title={"Створення нового питання"}>
         <div className="mb-4 flex flex-col gap-2">
            <CompactInput
               placeholder="Питання"
               type="text"
               val={question}
               changeVal={(e) => setQuestion(e.target.value)}
            />
            <CompactInput
               placeholder="Варіант A"
               type="text"
               val={optionA}
               changeVal={(e) => setOptionA(e.target.value)}
            />
            <CompactInput
               placeholder="Варіант Б"
               type="text"
               val={optionB}
               changeVal={(e) => setOptionB(e.target.value)}
            />
            <CompactInput
               placeholder="Варіант В"
               type="text"
               val={optionC}
               changeVal={(e) => setOptionC(e.target.value)}
            />
            <div className="flex gap-2">
               <div className="flex items-center">
                  <span>Правильний</span>
                  <select
                     className="hover-stone-cs px-1"
                     defaultValue={correctOption}
                     onChange={(e) => setCorrectOption(e.target.value)}
                  >
                     <option value="OptionA">Варіант A</option>
                     <option value="OptionB">Варіант Б</option>
                     <option value="OptionC">Варіант B</option>
                  </select>
               </div>

               <CompactInput
                  placeholder="Кількість балів"
                  type="number"
                  val={points}
                  changeVal={(e) => setPoints(Number(e.target.value))}
               />
            </div>
         </div>
         <div className="flex gap-4 justify-center">
            <button
               className="px-4 py-1 rounded-lg bg-stone-100 hover-stone-cs w-1/2"
               onClick={close}
            >
               Відміна
            </button>
            <StatusButton
               isPending={isPending}
               isError={isError}
               error={`${error}`}
               res={res}
               className="px-4 py-1 w-1/2"
            >
               <button
                  className="px-4 py-1 rounded-lg bg-amber-400 hover-stone-cs w-1/2"
                  onClick={submit}
               >
                  Підтвердити
               </button>
            </StatusButton>
         </div>
      </ModalTemplate>
   );
}

export { QuizPostSubmit };
