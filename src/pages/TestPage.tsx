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

   const [choice, setChoice] = useState({});

   const choose = (id: number, value: string) => {
      setChoice((s) => ({ ...s, [id]: value }));
   };

   const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      mutation.mutate(choice);
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
            <h1 className="max-w-[80ch] mx-auto text-center text-4xl">
               {data.lessonTitle}. {data.title}
            </h1>
            <div>
               {data.quizes.map((qz) => (
                  <Quiz {...qz} choose={choose} />
               ))}
            </div>
            {isEdit && (
               <button
                  className="hover-stone-cs py-1 px-2"
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
            <div>{JSON.stringify(choice)}</div>
            <div>
               {" "}
               <StatusButton
                  isPending={mutation.isPending}
                  isError={mutation.isError}
                  error={`${mutation.error}`}
                  res={mutation.data}
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
            <h5 className="max-w-[80ch] mx-auto text-end mt-2">
               <em>Автор: {data.author}</em>
            </h5>
         </>
      );
   return <div className="container mx-auto p-4 md:mt-8">{htm}</div>;
}

export default TestPage;
