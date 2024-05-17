import { ReactNode } from "react";

type ButtonProps = {
   children: ReactNode;
   onClick: React.MouseEventHandler<HTMLButtonElement>
};
function Button({ children, onClick }: ButtonProps) {
   return (
      <button
         onClick={onClick}
         className="py-2 px-8 text-lg rounded-lg bg-amber-400 hover:bg-amber-500 hover-stone-cs"
      >
         {children}
      </button>
   );
}

export default Button;
