import { useState } from "react";
import Input from "../components/Input";
import ModalForm from "../components/ModalForm";
import Button from "../components/Button";

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   return (
      <div className="container mx-auto flex justify-center p-8">
         <ModalForm>
            <h1 className="text-center text-4xl">Login</h1>
            <Input type="email" placeholder="Email" val={email} changeVal={changeEmail}/>
            <Input type="password" placeholder="Password" val={password} changeVal={changePassword} />
            <Button>Login</Button>
         </ModalForm>
      </div>
   );
}

export default Login;
