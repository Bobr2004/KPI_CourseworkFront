import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../mutations/userMutations";
import { validateUserFormAndSetError } from "../helpers/helpers";
import { ValidationError } from "../components/ValidationError";
import { authUserOnSuccess} from "../invalidations/userInvalidation";

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

   const createUserMutation = useMutation({
      mutationFn: createUser,
      onSuccess: ({id}) => {
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
         createUserMutation.mutate({ firstName, lastName, email, password });
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
            {validaionErorr && (
               <ValidationError text={validaionErorr}/>
            )}
            <Button onClick={submitForm}>Зарєструватися</Button>
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
