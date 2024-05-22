import { ReactNode } from "react";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type StatusButtonProps = {
   children: ReactNode;
   isPending: boolean;
   isError: boolean;
   error: string;
   res: any;
   className?: string;
};

function StatusButton({
   children,
   isPending,
   isError,
   error,
   res,
   className
}: StatusButtonProps) {
   className ||= "px-2";
   const renderButton = () => {
      if (isPending) return <ButtonStatusSpinner className={className} />;
      if (res) return <ButtonStatusSuccess className={className} />;
      if (isError)
         return (
            <ButtonStatusError
               className={className}
            >{`${error}`}</ButtonStatusError>
         );
      return <>{children}</>;
   };
   return <>{renderButton()}</>;
}

function ButtonStatusSpinner({ className }: { className: string }) {
   return (
      <div className={`${className} rounded-lg bg-blue-400 hover-stone-cs text-center`}>
         <div className="py-1 flex justify-center">
            <Spinner height="1rem" />
         </div>
      </div>
   );
}

function ButtonStatusSuccess({ className }: { className: string }) {
   return (
      <div className={`${className} rounded-lg bg-green-400 hover-stone-cs text-center`}>
         <FontAwesomeIcon icon={faCheck} />
      </div>
   );
}

function ButtonStatusError({
   children,
   className
}: {
   children: ReactNode;
   className: string;
}) {
   return (
      <div className={`${className} rounded-lg bg-red-400 hover-stone-cs text-center`}>
         {children}
      </div>
   );
}

export default StatusButton;
