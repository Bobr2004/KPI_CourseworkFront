import { useMutation, useQueryClient } from "@tanstack/react-query";
import CompactInput from "../CompactInput";
import { patchUser } from "../../mutations/userMutations";
import { useState } from "react";
import { validateUserFormAndSetError } from "../../helpers/helpers";
import { ValidationError } from "../ValidationError";
import AccountSaveButton from "./AccountSaveButton";
import { patchUserOnSuccess } from "../../invalidations/userInvalidation";

function ChangeEmailForm({ id }: { id: number }) {
   const [email, setEmail] = useState("");

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const queryClient = useQueryClient();

   const patchUserMutation = useMutation({
      mutationFn: patchUser,
      onSuccess: ({id}) => {
         patchUserOnSuccess(queryClient, id);
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (validateUserFormAndSetError({ email }, setValidationError)) {
         patchUserMutation.mutate({ id, email });
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
         <AccountSaveButton onClick={submitForm}/>
      </form>
   );
}

export { ChangeEmailForm };
