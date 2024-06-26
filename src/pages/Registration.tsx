import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../mutations/userMutations";
import { validateUserFormAndSetError } from "../helpers/helpers";
import { ValidationError } from "../components/ValidationError";
import { authUserOnSuccess } from "../invalidations/userInvalidation";
import StatusButton from "../components/StatusButton";

function Registration() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
   };
   const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
   };

   const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
   };

   const queryClient = useQueryClient();
   const redirect = useNavigate();

   const {
      isPending,
      isError,
      data: res,
      error,
      mutate
   } = useMutation({
      mutationFn: createUser,
      onSuccess: ({ id }) => {
         authUserOnSuccess(queryClient, id, redirect);
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (
         validateUserFormAndSetError(
            { firstName, lastName, email, password, confirmPassword },
            setValidationError
         )
      ) {
         mutate({ firstName, lastName, email, password });
      }
   };

   return (
      <div className="container mx-auto flex justify-center p-4 md:mt-8">
         <ModalForm>
            <h1 className="text-center text-3xl">Реєстрація</h1>
            <Input
               type="text"
               placeholder="Імʼя"
               val={firstName}
               changeVal={changeFirstName}
            />
            <Input
               type="text"
               placeholder="Прізвище"
               val={lastName}
               changeVal={changeLastName}
            />
            <Input
               type="email"
               placeholder="Електронна пошта"
               val={email}
               changeVal={changeEmail}
            />
            <Input
               type="password"
               placeholder="Пароль"
               val={password}
               changeVal={changePassword}
            />
            <Input
               type="password"
               placeholder="Підтвердіть пароль"
               val={confirmPassword}
               changeVal={changeConfirmPassword}
            />
            {validaionErorr && <ValidationError text={validaionErorr} />}
            <StatusButton
               isPending={isPending}
               isError={isError}
               error={`${error}`}
               res={res}
               className="px-8 py-2 w-2/3 sm:w-1/2"
            >
               <button
                  className="px-8 py-2 rounded-lg bg-amber-400 hover-stone-cs w-2/3 sm:w-1/2"
                  onClick={submitForm}
               >
                  Зареєструватися
               </button>
            </StatusButton>
            <div>
               Вже маєте аккаунт?{" "}
               <NavLink
                  to={routes.log}
                  className="text-amber-500 underline hover:text-amber-600"
               >
                  Увійти
               </NavLink>
            </div>
         </ModalForm>
      </div>
   );
}

export default Registration;
