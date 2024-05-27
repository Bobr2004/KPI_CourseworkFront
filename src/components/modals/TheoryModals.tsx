import { useMutation, useQueryClient } from "@tanstack/react-query";
import StatusButton from "../StatusButton";
import ModalTemplate from "./ModalTemplate";
import { patchTheory } from "../../mutations/adminMutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { wait } from "../../helpers/helpers";

function TheoryPatchSubmit({ close, data }: { close: () => void; data: any }) {
   const queryClient = useQueryClient();
   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: patchTheory,
      onSuccess: () => {
         const { id } = data.data.id;
         queryClient.invalidateQueries({ queryKey: [`theory/${id}`] });
         wait().then(close);
      }
   });

   const submit = () => {
      mutate({ id: data.data.id, html: data.data.html });
   };
   return (
      <ModalTemplate title={"Зберегти зміни теорії "}>
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
                  Зберегти <FontAwesomeIcon icon={faFloppyDisk} />
               </button>
            </StatusButton>
         </div>
      </ModalTemplate>
   );
}

export { TheoryPatchSubmit };
