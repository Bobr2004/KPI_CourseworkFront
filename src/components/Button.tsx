import { ReactNode } from "react";

type ButtonProps = {
   children: ReactNode;
};
function Button({ children }: ButtonProps) {
   return (
      <button className="py-2 px-8 text-lg rounded-lg bg-amber-500 hover:bg-amber-600 transition-all">{children}</button>
   );
}

export default Button;
