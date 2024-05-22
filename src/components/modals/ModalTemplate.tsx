import { ReactNode } from "react";
import { useModal } from "../../contexts/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModalTemplateProps = {
   children: ReactNode;
   title: string;
};

function ModalTemplate({ children, title }: ModalTemplateProps) {
   const modals = useModal();
   return (
      <div className="p-4 relative bg-stone-50 w-full sm:max-w-[450px]  flex-shrink-0 rounded-lg">
         <button
            className="absolute top-2 right-2 hover-stone-cs px-2"
            onClick={modals?.close}
         >
            <FontAwesomeIcon icon={faXmark} />
         </button>
         <h4 className=" text-lg text-center mb-4">{title}</h4>
         {children}
      </div>
   );
}

export default ModalTemplate;
