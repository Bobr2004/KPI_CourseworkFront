import { ReactNode } from "react";

type ButtonProps = {
   children: ReactNode;
};
function Button({ children }: ButtonProps) {
   return (
      <button className="py-2 px-8 text-lg rounded-lg bg-rose-700">{children}</button>
   );
}

export default Button;
