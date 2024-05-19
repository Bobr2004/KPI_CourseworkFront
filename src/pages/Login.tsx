import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../mutations/userMutations";
import { validateUserFormAndSetError } from "../helpers/helpers";
import { ValidationError } from "../components/ValidationError";

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

   const loginMutation = useMutation({
      mutationFn: loginUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["current-user"] });
      },
      onError: ()=>{
         setValidationError("Email чи пароль не вірні");
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (
         validateUserFormAndSetError(
            {email, password},
            setValidationError
         )
      ) {
         loginMutation.mutate({email, password });
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
            {validaionErorr && (
               <ValidationError text={validaionErorr}/>
            )}
            <Button onClick={submitForm}>Увійти</Button>
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
