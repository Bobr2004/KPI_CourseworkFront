import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { patchUser } from "../../mutations/userMutations";
import { validateUserFormAndSetError, wait } from "../../helpers/helpers";
import CompactInput from "../CompactInput";
import { ValidationError } from "../ValidationError";
import { patchUserOnSuccess } from "../../invalidations/userInvalidation";
import StatusButton from "../StatusButton";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChangePasswordForm({
   id,
   backToGui
}: {
   id: number;
   backToGui: () => void;
}) {
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
      if (
         validateUserFormAndSetError(
            { password, confirmPassword },
            setValidationError
         )
      ) {
         mutate({ id, password });
      }
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
         </div>
      </form>
   );
}

export { ChangePasswordForm };
