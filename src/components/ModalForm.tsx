import { ReactNode } from "react";

type ModalFormProps = {
   children: ReactNode;
};

function ModalForm({children}: ModalFormProps) {
  return (
    <form className="bg-slate-800 w-full sm:w-1/2  p-4 rounded-lg flex flex-col gap-4 items-center border border-white">
      {children}
    </form>
  )
}

export default ModalForm