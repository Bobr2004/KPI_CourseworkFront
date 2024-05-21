import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

function ButtonStatusSpinner() {
   return (
      <div className="px-2 py-1 rounded-lg bg-blue-400 hover-stone-cs flex justify-center">
         <Spinner height="16px" />
      </div>
   );
}

function ButtonStatusSuccess() {
   return (
      <div className="px-2 rounded-lg bg-green-400 hover-stone-cs text-center">
         <FontAwesomeIcon icon={faCheck} />
      </div>
   );
}

function ButtonStatusError({ children }: { children: ReactNode }) {
   return (
      <div className="px-2 rounded-lg bg-red-400 hover-stone-cs text-center">
         {children}
      </div>
   );
}

export { ButtonStatusSpinner, ButtonStatusSuccess, ButtonStatusError };
