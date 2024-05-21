import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { patchUser } from "../../mutations/userMutations";
import { validateUserFormAndSetError, wait } from "../../helpers/helpers";
import CompactInput from "../CompactInput";
import { ValidationError } from "../ValidationError";
import AccountSaveButton from "./AccountSaveButton";
import { patchUserOnSuccess } from "../../invalidations/userInvalidation";
import {
   ButtonStatusError,
   ButtonStatusSpinner,
   ButtonStatusSuccess
} from "./AccountButtonSpinner";

function ChangePasswordForm({ id, backToGui }: { id: number; backToGui: () => void }) {
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
   };

   const queryClient = useQueryClient();

   const patchUserMutation = useMutation({
      mutationFn: patchUser,
      onSuccess: ({ id }) => {
         patchUserOnSuccess(queryClient, id);
         wait().then(backToGui)
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (
         validateUserFormAndSetError(
            { password, confirmPassword },
            setValidationError
         )
      ) {
         patchUserMutation.mutate({ id, password });
      }
   };

   const renderButton = () => {
      if (patchUserMutation.isPending) return <ButtonStatusSpinner />;
      if (patchUserMutation.data) return <ButtonStatusSuccess />;
      if (patchUserMutation.isError)
         return (
            <ButtonStatusError>{`${patchUserMutation.error}`}</ButtonStatusError>
         );
      return <AccountSaveButton onClick={submitForm} />;
   };

   return (
      <form
         className="flex flex-col gap-2 h-full justify-between"
         onSubmit={(e) => {
            e.preventDefault();
         }}
      >
         {" "}
         <div className="flex flex-col gap-2">
            <h4>Зміна паролю</h4>
            <CompactInput
               placeholder="Пароль"
               type="password"
               val={password}
               changeVal={changePassword}
            />
            <CompactInput
               placeholder="Підтвердіть пароль"
               type="password"
               val={confirmPassword}
               changeVal={changeConfirmPassword}
            />
         </div>
         <div className="flex flex-col gap-2">
            {validaionErorr && (
               <ValidationError text={validaionErorr} className="text-sm" />
            )}
            {renderButton()}
         </div>
      </form>
   );
}

export { ChangePasswordForm };
