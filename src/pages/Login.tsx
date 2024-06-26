import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../mutations/userMutations";
import { validateUserFormAndSetError } from "../helpers/helpers";
import { ValidationError } from "../components/ValidationError";
import { authUserOnSuccess } from "../invalidations/userInvalidation";
import StatusButton from "../components/StatusButton";

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // Error messge
   const [validaionErorr, setValidationError] = useState("");

   const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
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
      mutationFn: loginUser,
      onSuccess: ({ id }) => {
         authUserOnSuccess(queryClient, id, redirect);
      },
      onError: () => {
         setValidationError("Email чи пароль не вірні");
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (
         validateUserFormAndSetError({ email, password }, setValidationError)
      ) {
         mutate({ email, password });
      }
   };

   return (
      <div className="container mx-auto flex justify-center p-4 md:mt-8">
         <ModalForm>
            <h1 className="text-center text-3xl">Вхід</h1>
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
            {validaionErorr && <ValidationError text={validaionErorr} />}
            {/* <Button onClick={submitForm}>Увійти</Button> */}
            <StatusButton
               isPending={isPending}
               isError={isError}
               error={`${error}`}
               res={res}
               className="px-8 py-2 w-1/2"
            >
               <button
                  className="px-8 py-2 rounded-lg bg-amber-400 hover-stone-cs w-1/2"
                  onClick={submitForm}
               >
                  Увійти
               </button>
            </StatusButton>
            <div>
               Ще немає аккаунта?{" "}
               <NavLink
                  to={routes.reg}
                  className="text-amber-500 underline hover:text-amber-600"
               >
                  Реєстрація
               </NavLink>
            </div>
         </ModalForm>
      </div>
   );
}

export default Login;
