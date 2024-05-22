import { ReactNode, createContext, useContext, useState } from "react";
import { DeleteSubmit, ExitSubmit } from "../components/modals/UserModals";
import Overlay from "../components/modals/Overlay";
import LessonDeleteSubmit from "../components/modals/LessonModals";

type openModalParams = { subject: string; id?: number; action: string };

type ModalContextProps = {
   close: () => void;
   openModal: ({ subject, id, action }: openModalParams) => void;
};

type ModalProps = {
   subject: string;
   id?: number;
   action?: string;
};

// subject: user - actions: delete, exit
// subject: lesson - actions: delete, patch, create
// subject: theory - actions: delete, create
// subject: test - actions: delete, create

const ModalContext = createContext<ModalContextProps | null | undefined>(null);

function ModalContextProvider({ children }: { children: ReactNode }) {
   const [modal, setModal] = useState<ModalProps>({
      subject: "",
      id: -1,
      action: ""
   });

   const close = () => {
      setModal({ subject: "", id: -1, action: "" });
   };

   const openModal = ({ subject, id, action }: openModalParams) => {
      setModal({ subject, id: id, action });
   };

   const renderModal = () => {
      if (modal.subject === "user") {
         switch (modal.action) {
            case "delete":
               return <DeleteSubmit close={close} />;
            case "exit":
               return <ExitSubmit close={close} />;
            default:
               return <>pivo</>;
         }
      }
      if (modal.subject === "lesson") {
         switch (modal.action) {
            case "delete":
               return (
                  <>
                     {modal.id && (
                        <LessonDeleteSubmit close={close} id={modal.id} />
                     )}
                  </>
               );
            case "exit":
               return <ExitSubmit close={close} />;
            default:
               return <>pivo</>;
         }
      }
   };

   return (
      <ModalContext.Provider value={{ close, openModal }}>
         {children}
         {modal.subject && <Overlay>{renderModal()}</Overlay>}
      </ModalContext.Provider>
   );
}

const useModal = () => {
   return useContext(ModalContext);
};

export { ModalContextProvider, useModal };
