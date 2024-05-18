import { useState } from "react";
import CompactInput from "../components/CompactInput";
import AccountButton from "./AccountButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type AccountChnageType = {
   id: number;
   email: string;
};

function AccountChange({ id, email }: AccountChnageType) {
   const [openEmailForm, setOpenEmailForm] = useState(false);
   const toggleEmailForm = () => {
      setOpenEmailForm((opn) => !opn);
   };
   const [openPasswordForm, setOpenPasswordForm] = useState(false);
   const togglePasswordForm = () => {
      setOpenPasswordForm((opn) => !opn);
   };

   const backToGui = () => {
      setOpenEmailForm(false);
      setOpenPasswordForm(false);
   };

   let htm: JSX.Element;
   if (openEmailForm) htm = <ChangeEmailForm id={id} />;
   else if (openPasswordForm) htm = <ChangePasswordForm id={id} />;
   else htm = <ChnageGui {...{ email, toggleEmailForm, togglePasswordForm }} />;
   return (
      <div className="flex flex-col gap-2 border border-stone-600 p-2 bg-stone-100 rounded-lg w-full md:w-1/2 relative">
         <p className="text-stone-600 text-sm text-center absolute top-2 left-2">
            Ця інформація видна тільки вам*
         </p>
         {(openEmailForm || openPasswordForm) && (
            <button
               className="absolute top-2 right-2 hover-stone-cs px-2"
               onClick={backToGui}
            >
               <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
         )}

         {htm}
      </div>
   );
}

type ChangeGuiProps = {
   email: string;
   toggleEmailForm: () => void;
   togglePasswordForm: () => void;
};

function ChnageGui({
   email,
   toggleEmailForm,
   togglePasswordForm
}: ChangeGuiProps) {
   return (
      <div className="mt-6 flex flex-col gap-2 h-full justify-between">
         <div className="flex flex-col">
            <p>Електронна адреса:</p>
            <p>{email}</p>
         </div>
         <AccountButton onClick={toggleEmailForm}>Змінити email</AccountButton>
         <AccountButton onClick={togglePasswordForm}>
            Змінити пароль
         </AccountButton>
      </div>
   );
}

function ChangeEmailForm({ id }: { id: number }) {
   return (
      <form
         className="mt-6 flex flex-col gap-2 h-full justify-between"
         onSubmit={(e) => {
            e.preventDefault();
         }}
      >
         <div className="flex flex-col gap-2">
            <h4>Зміна електронної адреси</h4>
            <CompactInput placeholder="Email" type="email" />
         </div>
         <AccountButton onClick={() => {}}>Зберегти email</AccountButton>
      </form>
   );
}

function ChangePasswordForm({ id }: { id: number }) {
   return (
      <form
         className="mt-7 flex flex-col gap-2 h-full justify-between"
         onSubmit={(e) => {
            e.preventDefault();
         }}
      >
         <CompactInput placeholder="пароль" type="password" />
         <CompactInput placeholder="Підтвердження паролю" type="password" />
         <AccountButton onClick={() => {}}>Зберегти пароль</AccountButton>
      </form>
   );
}

export default AccountChange;
