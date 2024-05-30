import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTest } from "../queries/lessonQueries";
import { useMemo, useState } from "react";
import { Quiz } from "../components/Quiz";
import { useModal } from "../contexts/ModalContext";
import { useUser } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { submitTest } from "../mutations/testMutations";
import StatusButton from "../components/StatusButton";
import EditElement from "../components/EditElement";
import { ValidationError } from "../components/ValidationError";

function TestPage() {
   const modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   const { id } = useParams();
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`test/${id}`],
      queryFn: getTest(Number(id))
   });

   const mutation = useMutation({
      mutationFn: submitTest,
      onSuccess: () => {}
   });

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const [choice, setChoice] = useState({});

   const choose = (id: number, value: string) => {
      setChoice((s) => ({ ...s, [id]: value }));
   };

   const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (data?.quizes && Object.entries(choice).length < data?.quizes.length) {
         setValidationError("Ви не відповіли на всі питання!");
         return;
      }
      setValidationError("");
      const sendTestId = Number(id) || -1;
      console.log({ testId: sendTestId, ...choice });
      mutation.mutate({ testId: sendTestId, ...choice });
   };

   let htm: JSX.Element;
   if (isPending)
      htm = (
         <div className="flex justify-center">
            <Spinner height="4.5rem" />
         </div>
      );
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
            <div className="max-w-[80ch] mx-auto flex justify-center">
               <h1 className=" flex flex-col gap-1 items-center">
                  <span className="text-stone-500 font-bold text-3xl">
                     {data.lessonTitle}
                  </span>
                  <span className=" font-bold relative text-4xl">
                     {isEdit && (
                        <EditElement
                           onClick={() =>
                              modals?.openModal({
                                 subject: "element",
                                 data: {
                                    element: "test",
                                    id,
                                    title: data.title
                                 },
                                 action: "patch"
                              })
                           }
                        />
                     )}
                     {data.title}
                  </span>
               </h1>
            </div>
            <div className="flex flex-col gap-2 mt-4">
               {data.quizes.map((qz, i) => (
                  <Quiz key={i} {...qz} choose={choose} parentId={Number(id)} />
               ))}
            </div>

            {/* <div>{JSON.stringify(choice)}</div> */}
            {validaionErorr && (
               <ValidationError
                  text={validaionErorr}
                  className="text-sm mt-2"
               />
            )}
            <div className="flex justify-center mt-4">
               {isEdit && (
                  <button
                     className="hover-stone-cs px-4 py-1"
                     onClick={() =>
                        modals?.openModal({
                           subject: "quiz",
                           data: { element: "quiz", parentTestId: id },
                           action: "post"
                        })
                     }
                  >
                     Додати питання <FontAwesomeIcon icon={faPlus} />
                  </button>
               )}
               {!isEdit && (
                  <StatusButton
                     isPending={mutation.isPending}
                     isError={mutation.isError}
                     error={`${mutation.error}`}
                     res={mutation.data}
                     className="px-4 py-1 w-1/2"
                  >
                     <button
                        className="px-4 py-1  bg-amber-400 hover-stone-cs"
                        onClick={submit}
                     >
                        Отримати результат
                     </button>
                  </StatusButton>
               )}
            </div>
            <h5 className="max-w-[80ch] mx-auto text-end mt-2">
               <em>Автор: {data.author}</em>
            </h5>
         </>
      );
   return <div className="container mx-auto p-4 md:mt-8">{htm}</div>;
}

export default TestPage;
