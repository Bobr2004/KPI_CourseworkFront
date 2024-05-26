import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getTest } from "../queries/lessonQueries";
import { useMemo, useState } from "react";
import { Quiz } from "../components/Quiz";
import { useModal } from "../contexts/ModalContext";
import { useUser } from "../contexts/UserContext";

function TestPage() {
   const modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   const { id } = useParams();
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`test/${id}`],
      queryFn: getTest(Number(id))
   });

   const [choice, setChoice] = useState({});

   const choose = (id: number, value: string) => {
      setChoice((s) => ({ ...s, [id]: value }));
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
            <div>{JSON.stringify(choice)}</div>
            <h5 className="max-w-[80ch] mx-auto text-end mt-2">
               <em>Автор: {data.author}</em>
            </h5>
         </>
      );
   return <div className="container mx-auto p-4 md:mt-8">{htm}</div>;
}

export default TestPage;
