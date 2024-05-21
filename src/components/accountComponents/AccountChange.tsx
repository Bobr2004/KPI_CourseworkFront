import { useState } from "react";
import AccountButton from "./AccountButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ChangePasswordForm } from "./ChangePassword";
import { ChangeEmailForm } from "./ChnageEmail";
import { SpecialDisplay } from "./SpecialDisplay";
import AccountDelete from "./AccountDelete";
import AccountLeave from "./AccountLeave";

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
      <div className="flex flex-col w-full md:w-1/2 gap-2 md:min-h-[235px] justify-between">
         <div className="flex flex-col gap-2 border border-stone-600 p-2 bg-stone-100 rounded-lg w-full relative">
            <SpecialDisplay />
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
         <div className="flex gap-4 p-2 justify-center">
            <AccountDelete />
            <AccountLeave />
         </div>
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
      <div className="flex flex-col gap-4 h-full justify-between">
         <div className="flex flex-col">
            <p>Електронна адреса:</p>
            <p>{email}</p>
         </div>
         <div className="flex flex-col gap-2">
            <AccountButton onClick={toggleEmailForm}>
               Змінити email
            </AccountButton>
            <AccountButton onClick={togglePasswordForm}>
               Змінити пароль
            </AccountButton>
         </div>
      </div>
   );
}

export default AccountChange;
