import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../queries/post";

function Registration() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

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

   const createMutation = useMutation({
      mutationFn: createUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
   });

   const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      createMutation.mutate({ firstName, lastName, email, password });
   };

   return (
      <div className="container mx-auto flex justify-center p-8 mt-12">
         <ModalForm>
            <h1 className="text-center text-4xl">Реєстрація</h1>
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
            <Button onClick={submitForm}>Зарєструватися</Button>
            <div>
               Вже маєте аккаунт?{" "}
               <NavLink to={routes.log} className="text-amber-500 underline">
                  Увійти
               </NavLink>
            </div>
         </ModalForm>
      </div>
   );
}

export default Registration;
