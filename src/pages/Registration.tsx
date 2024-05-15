import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";

function Registration() {
   const [fisrtName, setFisrtName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFisrtName(e.target.value);
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

   return (
      <div className="container mx-auto flex justify-center p-8 mt-12">
         <ModalForm>
            <h1 className="text-center text-4xl">Реєстрація</h1>
            <Input
               type="text"
               placeholder="Імʼя"
               val={fisrtName}
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
            <Button>Зарєструватися</Button>
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
