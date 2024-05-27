import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
   faGraduationCap,
   faTriangleExclamation,
   faUserTie
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountChange from "./AccountChange";
import { useUser } from "../../contexts/UserContext";
import { ChnageNameSpecialGui } from "./ChangeName";

type AccountDataProps = {
   id: number;
   email: string;
   role: string;
   firstName: string;
   lastName: string;
   score: number;
   performance: number;
};

function AccountData({
   id,
   email,
   role,
   firstName,
   lastName,
   score,
   performance
}: AccountDataProps) {
   let roleIcon: IconDefinition;
   let roleName: "студент" | "адмін" | "роль не знайдено";
   if (role === "user") {
      roleIcon = faGraduationCap;
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
      <>
         <div className="flex gap-4 flex-col items:center md:flex-row md:items-start">
            <FontAwesomeIcon icon={roleIcon} className="h-[164px]" />
            <div className="flex flex-col gap-2 w-full md:w-1/2 mb-2 md:mb-0">
               <div className="flex gap-2">
                  {!isCurrentUser ? (
                     <h2 className="text-xl">
                        {lastName} {firstName}
                     </h2>
                  ) : (
                     <ChnageNameSpecialGui
                        id={id}
                        baseFirstName={firstName}
                        baseLastName={lastName}
                     />
                  )}
               </div>
               <h3>
                  Роль: <b>{roleName}</b>
               </h3>
               <p>
                  Загальний бал: <b>{score}</b>
               </p>
               <p>
                  Середня встигаємість:{" "}
                  <b
                     className={
                        performance >= 60 ? " text-green-500" : "text-red-500"
                     }
                  >
                     {performance}%
                  </b>
               </p>
            </div>
            {isCurrentUser && <AccountChange id={id} email={email} />}
         </div>
      </>
   );
}

export default AccountData;
