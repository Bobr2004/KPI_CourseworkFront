import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { ValidationError } from "../ValidationError";
import { wait } from "../../helpers/helpers";

function ElementDeleteSubmit({
   close,
   data,
   invalidate
}: {
   close: () => void;
   data: deleteElementDataType;
   invalidate: string;
}) {
   const quetyClient = useQueryClient();
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: deleteElement,
      onSuccess: () => {
         quetyClient.invalidateQueries({ queryKey: [invalidate] });
         wait().then(close);
      }
   });

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
   const quetyClient = useQueryClient();
   const [validaionErorr, setValidaionErorr] = useState("");
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: postElement,
      onSuccess: () => {
         console.log(element);
         if (element === "lesson")
            quetyClient.invalidateQueries({ queryKey: [`lessons`] });
         else
            quetyClient.invalidateQueries({ queryKey: [`lesson/${parentId}`] });
         wait().then(close);
      }
   });

   const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   };

   const submit = () => {
      if (!title) {
         setValidaionErorr("Поле не може бути пустим");
         return;
      }
      setValidaionErorr("");
      let prntId = parentId || -1;
      console.log({ element, parentId: prntId, title });
      mutate({ element, parentId: prntId, title });
   };
   return (
      <ModalTemplate title={"Створення нового елементу"}>
         <div className="mb-2 flex flex-col gap-2">
            <div className="flex gap-2">
               <select
                  defaultValue={element}
                  className="hover-stone-cs py-1 w-1/2"
                  onChange={(e) => setElement(e.target.value)}
               >
                  <option value="lesson">Тема</option>
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
   const quetyClient = useQueryClient();
   const [title, setTitle] = useState(data.title);
   const [validaionErorr, setValidaionErorr] = useState("");
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: patchElementTitle,
      onSuccess: () => {
         const { element, id } = data;
         if (element === "lesson")
            quetyClient.invalidateQueries({ queryKey: [`${element}`] });
         else quetyClient.invalidateQueries({ queryKey: [`${element}/${id}`] });
         wait().then(close);
      }
   });

   const submit = () => {
      if (!title) {
         setValidaionErorr("Поле не може бути пустим");
         return;
      }
      setValidaionErorr("");
      mutate({ element: data.element, title, id: data.id });
   };
   return (
      <ModalTemplate title={"Змінити назву"}>
         <div className="flex flex-col mb-2">
            <CompactInput
               placeholder="Назва"
               type="text"
               val={title}
               changeVal={(e) => setTitle(e.target.value)}
            />
         </div>
         {validaionErorr && (
            <ValidationError text={validaionErorr} className="text-sm" />
         )}
         <div className="flex gap-4 justify-center mt-2">
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
