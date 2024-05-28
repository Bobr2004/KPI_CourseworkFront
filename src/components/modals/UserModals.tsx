import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalTemplate from "./ModalTemplate";
import { faRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CompactInput from "../CompactInput";
import { useMemo, useState } from "react";
import { ValidationError } from "../ValidationError";
import { deleteUser, logoutUser } from "../../mutations/userMutations";
import { leaveUserOnSuccess } from "../../invalidations/userInvalidation";
import { useNavigate } from "react-router-dom";
import StatusButton from "../StatusButton";
import { wait } from "../../helpers/helpers";

function ExitSubmit({ close }: { close: () => void }) {
   const queryClient = useQueryClient();
   const redirect = useNavigate();

   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
         leaveUserOnSuccess(queryClient, redirect);
         wait().then(close);
      }
   });

   const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      // mutation
      mutate();
   };
   return (
      <ModalTemplate title={"Підтвердити вихід"}>
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
                  Підтвердити <FontAwesomeIcon icon={faRightFromBracket} />
               </button>
            </StatusButton>
         </div>
      </ModalTemplate>
   );
}

function DeleteSubmit({ close }: { close: () => void }) {
   const [codeWord, setCodeWord] = useState("");

   const [validaionErorr, setValidationError] = useState("");
   const generateRandomWord = (symbols: number) => () => {
      const allSymblos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let word = "";
      for (let i = 0; i < symbols; i += 1) {
         word = word.concat(
            allSymblos.charAt(Math.floor(Math.random() * allSymblos.length))
         );
      }
      return word;
   };
   let word = useMemo(generateRandomWord(8), []);

   const changeCodeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCodeWord(e.target.value);
   };

   const queryClient = useQueryClient();
   const redirect = useNavigate();

   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
         leaveUserOnSuccess(queryClient, redirect);
         wait().then(close);
      }
   });

   const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!codeWord) {
         setValidationError("Введіть кодове слово!");
         return;
      }
      if (codeWord !== word) {
         setValidationError("Неправильно введено кодове слово");
         return;
      }
      setValidationError("");
      // mutation
      mutate();
   };

   return (
      <ModalTemplate title={"Підтвердити видалення"}>
         <div className="flex flex-col mb-4 gap-2">
            <p>
               Для підтвердження видалення введіть наступне кодове слово:{" "}
               <em className="font-bold" style={{userSelect: "none"}}>{word}</em>
            </p>
            <CompactInput
               type="text"
               placeholder="Кодове слово"
               val={codeWord}
               changeVal={changeCodeWord}
            />
            {validaionErorr && (
               <ValidationError text={validaionErorr} className="text-sm" />
            )}
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
                  className="px-4 py-1 rounded-lg bg-red-400 hover-stone-cs w-1/2"
                  onClick={submit}
               >
                  Підтвердити <FontAwesomeIcon icon={faTrash} />
               </button>
            </StatusButton>
         </div>
      </ModalTemplate>
   );
}

export { ExitSubmit, DeleteSubmit };
