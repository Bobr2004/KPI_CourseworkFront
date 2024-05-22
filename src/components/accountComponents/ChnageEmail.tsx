import { useMutation, useQueryClient } from "@tanstack/react-query";
import CompactInput from "../CompactInput";
import { patchUser } from "../../mutations/userMutations";
import { useState } from "react";
import { validateUserFormAndSetError, wait } from "../../helpers/helpers";
import { ValidationError } from "../ValidationError";
import { patchUserOnSuccess } from "../../invalidations/userInvalidation";
import StatusButton from "../StatusButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function ChangeEmailForm({
   id,
   backToGui
}: {
   id: number;
   backToGui: () => void;
}) {
   const [email, setEmail] = useState("");

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const queryClient = useQueryClient();

   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: patchUser,
      onSuccess: ({ id }) => {
         patchUserOnSuccess(queryClient, id);
         wait().then(backToGui);
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (validateUserFormAndSetError({ email }, setValidationError)) {
         mutate({ id, email });
      }
   };

   return (
      <form
         className="flex flex-col gap-2 h-full justify-between"
         onSubmit={(e) => {
            e.preventDefault();
         }}
      >
         <div className="flex flex-col gap-2">
            <h4>Зміна електронної адреси</h4>
            <CompactInput
               placeholder="Email"
               type="email"
               val={email}
               changeVal={changeEmail}
            />
         </div>
         {validaionErorr && (
            <ValidationError text={validaionErorr} className="text-sm" />
         )}
         <StatusButton
            isPending={isPending}
            isError={isError}
            error={`${error}`}
            res={res}
         >
            <button
               className="px-2 rounded-lg bg-amber-400 hover-stone-cs text-center"
               onClick={submitForm}
            >
               Збергти <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
         </StatusButton>
      </form>
   );
}

export { ChangeEmailForm };
