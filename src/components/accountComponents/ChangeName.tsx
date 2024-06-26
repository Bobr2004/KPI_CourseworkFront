import { useMutation, useQueryClient } from "@tanstack/react-query";
import CompactInput from "../CompactInput";
import { patchUser } from "../../mutations/userMutations";
import { useState } from "react";
import { validateUserFormAndSetError, wait } from "../../helpers/helpers";
import {
   faFloppyDisk,
   faPen,
   faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpecialDisplay } from "./SpecialDisplay";
import { ValidationError } from "../ValidationError";
import { patchUserOnSuccess } from "../../invalidations/userInvalidation";

import StatusButton from "../StatusButton";

type ChnageNameFormProps = {
   id: number;
   baseFirstName: string;
   baseLastName: string;
};

function ChnageNameSpecialGui({
   id,
   baseFirstName,
   baseLastName
}: ChnageNameFormProps) {
   const [formOpen, setFormOpen] = useState(false);
   return (
      <>
         {formOpen ? (
            <ChangeNameForm
               {...{ id, baseFirstName, baseLastName, setFormOpen }}
            />
         ) : (
            <>
               <h2 className="text-xl">
                  {baseFirstName} {baseLastName}
               </h2>
               <button
                  className="hover-stone-cs px-2"
                  onClick={() => {
                     setFormOpen((frmo) => !frmo);
                  }}
               >
                  <FontAwesomeIcon icon={faPen} />
               </button>
            </>
         )}
      </>
   );
}

type ChangeNameFormPropsWithToggler = ChnageNameFormProps & {
   setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChangeNameForm({
   id,
   baseFirstName,
   baseLastName,
   setFormOpen
}: ChangeNameFormPropsWithToggler) {
   const [firstName, setFirstName] = useState(baseFirstName);
   const [lastName, setLastName] = useState(baseLastName);

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
   };
   const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
   };

   const backToGui = () => {
      setFormOpen(false);
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
            { firstName, lastName },
            setValidationError
         )
      ) {
         mutate({ id, firstName, lastName });
      }
   };

   return (
      <form
         className="flex flex-col gap-2 border border-stone-600 p-2 bg-stone-100 rounded-lg w-full relative"
         onSubmit={(e) => {
            e.preventDefault();
         }}
      >
         <SpecialDisplay />
         <button
            className="absolute top-2 right-2 hover-stone-cs px-2"
            onClick={backToGui}
         >
            <FontAwesomeIcon icon={faRightFromBracket} />
         </button>

         <div className="flex flex-col gap-2">
            <h4>Зміна імені та прізища</h4>
            <CompactInput
               placeholder="Імʼя"
               type="text"
               val={firstName}
               changeVal={changeFirstName}
            />
            <CompactInput
               placeholder="Прізвище"
               type="text"
               val={lastName}
               changeVal={changeLastName}
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

export { ChnageNameSpecialGui, ChangeNameForm };
