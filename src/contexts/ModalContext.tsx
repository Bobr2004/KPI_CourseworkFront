import { ReactNode, createContext, useContext, useState } from "react";
import { DeleteSubmit, ExitSubmit } from "../components/modals/UserModals";
import Overlay from "../components/modals/Overlay";

type ModalContextProps = {
   close: () => void;
   openModal: (modalToOpen: string) => void;
};

const ModalContext = createContext<ModalContextProps | null | undefined>(null);

function ModalContextProvider({ children }: { children: ReactNode }) {
   const [modal, setModal] = useState("");

   const close = () => {
      setModal("");
   };

   const openModal = (modalToOpen: string) => {
      setModal(modalToOpen);
   };

   const renderModal = () => {
      switch (modal) {
         case "exit":
            return <ExitSubmit close={close} />;
         case "delete":
            return <DeleteSubmit close={close} />;
         default:
            return <>Pivo</>;
      }
   };

   return (
      <ModalContext.Provider value={{ close, openModal }}>
         {children}
         {modal && <Overlay>{renderModal()}</Overlay>}
      </ModalContext.Provider>
   );
}

const useModal = () => {
   return useContext(ModalContext);
};

export { ModalContextProvider, useModal };
