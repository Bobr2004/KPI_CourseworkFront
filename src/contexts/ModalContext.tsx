import { ReactNode, createContext, useContext, useState } from "react";
import { DeleteSubmit, ExitSubmit } from "../components/modals/UserModals";
import Overlay from "../components/modals/Overlay";
import { TheoryPatchSubmit } from "../components/modals/TheoryModals";
import {
   ElementDeleteSubmit,
   ElementPostSubmit
} from "../components/modals/ElementModals";
import PostElement from "../components/postElement";

type openModalParams = { subject: string; data?: any; action: string };

type ModalContextProps = {
   close: () => void;
   openModal: ({ subject, data, action }: openModalParams) => void;
};

type ModalProps = {
   subject: string;
   data?: any;
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
      action: ""
   });

   const close = () => {
      setModal({ subject: "", action: "" });
   };

   const openModal = ({ subject, data, action }: openModalParams) => {
      setModal({ subject, data, action });
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
      if (modal.subject === "element") {
         switch (modal.action) {
            case "delete":
               return (
                  <>
                     {modal.data && (
                        <ElementDeleteSubmit close={close} data={modal.data} />
                     )}
                  </>
               );
            case "post":
               return (
                  <>
                     <ElementPostSubmit close={close} />
                  </>
               );
            default:
               <>pivo</>;
         }
      }
      if (modal.subject === "lesson") {
         switch (modal.action) {
            case "patch":
               return <ExitSubmit close={close} />;
            default:
               return <>pivo</>;
         }
      }
      if (modal.subject === "theory") {
         console.log("oleg");
         switch (modal.action) {
            case "patch":
               return <TheoryPatchSubmit close={close} data={modal.data} />;
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
