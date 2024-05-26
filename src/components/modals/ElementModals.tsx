import { useMutation, useQuery } from "@tanstack/react-query";
import {
   deleteElement,
   deleteElementDataType,
   patchElementTitle,
   patchElementTitleType,
   postElement
} from "../../mutations/adminMutations";
import ModalTemplate from "./ModalTemplate";
import StatusButton from "../StatusButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CompactInput from "../CompactInput";
import { getLessons } from "../../queries/lessonQueries";
import Spinner from "../Spinner";

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
   const [parentId, setParentId] = useState<number | undefined>(undefined);
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
      let prntId = parentId || -1;
      console.log({ element, parentId: prntId, title });
      mutate({ element, parentId: prntId, title });
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
                  <SelectParent value={parentId} setValue={setParentId} />
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

function SelectParent({
   value,
   setValue
}: {
   value: number | undefined;
   setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
   const { isPending, isError, data, error } = useQuery({
      queryKey: ["lessons"],
      queryFn: getLessons
   });
   let htm: JSX.Element;

   useEffect(() => {
      if (data) setValue(data[0].id);
   }, [data]);

   if (isPending) htm = <Spinner height="4.5rem" />;
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
            <select
               className="hover-stone-cs py-1 w-1/2"
               defaultValue={value}
               onChange={(e) => setValue(Number(e.target.value))}
            >
               {data.map((lsn) => (
                  <option key={lsn.id} value={lsn.id}>
                     {lsn.title}
                  </option>
               ))}
            </select>
         </>
      );

   return <>{htm}</>;
}

function ElementPatchSubmit({
   close,
   data
}: {
   close: () => void;
   data: patchElementTitleType;
}) {
   const [title, setTitle] = useState(data.title);
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({ mutationFn: patchElementTitle });

   const submit = () => {
      mutate({ element: data.element, title, id: data.id });
   };
   return (
      <ModalTemplate title={"Змінити назву"}>
         <div className="flex flex-col mb-4">
            <CompactInput
               placeholder="Назва"
               type="text"
               val={title}
               changeVal={(e) => setTitle(e.target.value)}
            />
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
                  Зберегти <FontAwesomeIcon icon={faPen} />
               </button>
            </StatusButton>
         </div>
      </ModalTemplate>
   );
}

export { ElementDeleteSubmit, ElementPostSubmit, ElementPatchSubmit };
