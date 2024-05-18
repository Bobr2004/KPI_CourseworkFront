import { ButtonProps } from "../components/Button";

function AccountButton({ children, onClick }: ButtonProps) {
   return (
      <button
         className="px-2 rounded-lg bg-amber-400 hover:bg-amber-500 hover-stone-cs"
         onClick={onClick}
      >
         {children}
      </button>
   );
}

export default AccountButton;
