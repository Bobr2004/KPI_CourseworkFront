import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
   faPen,
   faTriangleExclamation,
   faUser,
   faUserTie
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountChange from "./AccountChange";
import { useUser } from "../contexts/UserContext";

type AccountDataProps = {
   id: number;
   email: string;
   role: string;
   firstName: string;
   lastName: string;
   score: number;
};

function AccountData({
   id,
   email,
   role,
   firstName,
   lastName,
   score
}: AccountDataProps) {
   let roleIcon: IconDefinition;
   let roleName: "студент" | "адмін" | "роль не знайдено";
   if (role === "user") {
      roleIcon = faUser;
      roleName = "студент";
   } else if (role === "admin") {
      roleIcon = faUserTie;
      roleName = "адмін";
   } else {
      roleIcon = faTriangleExclamation;
      roleName = "роль не знайдено";
   }

   const user = useUser();

   const isCurrentUser = user && user.id === id;

   return (
      <div className="flex gap-4">
         <FontAwesomeIcon icon={roleIcon} size="10x" />
         <div className="flex flex-col gap-2 p-2 w-1/2">
            <div className="flex gap-2">
               <h2 className="text-xl">
                  {lastName} {firstName}
               </h2>
               {isCurrentUser && <FontAwesomeIcon icon={faPen} />}
            </div>
            <h3>
               Роль: <b>{roleName}</b>
            </h3>
            <p>
               Загальний бал: <b>{score}</b>
            </p>
         </div>
         {isCurrentUser && <AccountChange id={id} email={email} />}
      </div>
   );
}

export default AccountData;
