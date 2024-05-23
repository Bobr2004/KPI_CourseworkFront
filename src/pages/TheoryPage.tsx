import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTheory } from "../queries/lessonQueries";
import Spinner from "../components/Spinner";
import { useEffect, useMemo, useRef, useState } from "react";
import { useModal } from "../contexts/ModalContext";
import { useUser } from "../contexts/UserContext";
import StatusButton from "../components/StatusButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function TheoryPage() {
   const modals = useModal();
   const currentUser = useUser();
   const isEdit = useMemo(() => currentUser?.editMode, [currentUser?.editMode]);
   const [html, setHtml] = useState("");

   const { id } = useParams();
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`theory/${id}`],
      queryFn: getTheory(Number(id))
   });

   const htmlDiv = useRef<HTMLDivElement>(null);
   useEffect(() => {
      if (data?.html) {
         setHtml(data.html);
      }
   }, [data?.html]);

   const changeHTML = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHtml(`${e.target.value}`);
      console.log(html);
      console.log("1");
   };

   useEffect(() => {
      if (htmlDiv.current) htmlDiv.current.innerHTML = html;
   }, [html, isEdit]);

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
               {data.lessonTitle} ({data.title})
            </h1>
            {isEdit ? (
               <section className="max-w-[80ch] mx-auto">
                  <textarea
                     className=" w-full mt-8 hover-stone-cs p-4 block"
                     onChange={changeHTML}
                     rows={50}
                  >
                     {html}
                  </textarea>
               </section>
            ) : (
               <div
                  className="max-w-[80ch] mx-auto mt-8 flex flex-col gap-3 theoryHtml"
                  ref={htmlDiv}
               ></div>
            )}
            <div className="max-w-[80ch] mx-auto flex justify-between mt-2 gap-2 ">
               {currentUser?.role === "admin" && (
                  <button
                     className="hover-stone-cs px-2 bg-amber-400"
                     onClick={() =>
                        modals?.openModal({
                           subject: "theory",
                           data: {html},
                           action: "patch"
                        })
                     }
                  >
                     <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
               )}
               <h5 className="">
                  <em>Автор: {data.author}</em>
               </h5>
            </div>
         </>
      );
   return <div className="container mx-auto p-4 md:mt-8">{htm}</div>;
}

export default TheoryPage;
