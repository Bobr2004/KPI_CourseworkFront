import { useMutation } from "@tanstack/react-query";
import {
   deleteElement,
   deleteElementDataType,
   postElement
} from "../../mutations/adminMutations";
import ModalTemplate from "./ModalTemplate";
import StatusButton from "../StatusButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CompactInput from "../CompactInput";

function ElementDeleteSubmit({
   close,
   data
}: {
   close: () => void;
   data: deleteElementDataType;
}) {
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({ mutationFn: deleteElement });

   const submit = () => {
      mutate(data);
   };
   return (
      <ModalTemplate title={"Підтвердити видалення елементу"}>
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

function ElementPostSubmit({ close }: { close: () => void }) {
   const [element, setElement] = useState("lesson");
   const isChildren = element !== "lesson";
   const [parentId, setParentId] = useState(undefined);
   const [title, setTitle] = useState("");
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({ mutationFn: postElement });

   const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   };

   const submit = () => {
      console.log({ element, parentId, title });
      mutate({ element, parentId: 23, title });
   };
   return (
      <ModalTemplate title={"Створення нового елементу"}>
         <div className="mb-4 flex flex-col gap-2">
            <div className="flex gap-2">
               <select
                  defaultValue={element}
                  className="hover-stone-cs py-1 w-1/2"
                  onChange={(e) => setElement(e.target.value)}
               >
                  <option value="lesson">Урок</option>
                  <option value="test">Тест</option>
                  <option value="theory">Теорія</option>
               </select>
               {isChildren && (
                  <select className="hover-stone-cs py-1 w-1/2">
                     <option value="lesson">Основи програмування</option>
                     <option value="test">Продвинуте програмування</option>
                     <option value="theory">Олег мега</option>
                  </select>
               )}
            </div>
            <div className="flex flex-col">
               <CompactInput
                  placeholder="Назва"
                  type="text"
                  val={title}
                  changeVal={changeTitle}
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

export { ElementDeleteSubmit, ElementPostSubmit };
