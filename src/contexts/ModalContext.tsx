import { ReactNode, createContext, useContext, useState } from "react";
import { DeleteSubmit, ExitSubmit } from "../components/modals/UserModals";
import Overlay from "../components/modals/Overlay";
import { TheoryPatchSubmit } from "../components/modals/TheoryModals";
import {
   ElementDeleteSubmit,
   ElementPatchSubmit,
   ElementPostSubmit
} from "../components/modals/ElementModals";
import { QuizPostSubmit } from "../components/modals/QuizModals";
import ErrorModal from "../components/modals/ErrorModal";
import TestPassedModal from "../components/modals/TestPassedModal";

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
               return <ErrorModal close={close} />;
         }
      }
      if (modal.subject === "element") {
         switch (modal.action) {
            case "delete":
               return (
                  <>
                     {modal.data && (
                        <ElementDeleteSubmit
                           close={close}
                           data={{
                              element: modal.data.element,
                              id: modal.data.id
                           }}
                           invalidate={modal.data.invalidate}
                        />
                     )}
                  </>
               );
            case "post":
               return (
                  <>
                     <ElementPostSubmit close={close} />
                  </>
               );
            case "patch":
               return (
                  <>
                     {modal.data && (
                        <ElementPatchSubmit close={close} data={modal.data} />
                     )}
                  </>
               );
            default:
               return <ErrorModal close={close} />;
         }
      }
      if (modal.subject === "lesson") {
         switch (modal.action) {
            case "patch":
               return <ExitSubmit close={close} />;
            default:
               return <ErrorModal close={close} />;
         }
      }
      if (modal.subject === "test") {
         switch (modal.action) {
            case "passed":
               return (
                  <TestPassedModal close={close} testId={modal.data.testId} />
               );
            default:
               return <ErrorModal close={close} />;
         }
      }
      if (modal.subject === "theory") {
         switch (modal.action) {
            case "patch":
               return <TheoryPatchSubmit close={close} data={modal.data} />;
            default:
               return <ErrorModal close={close} />;
         }
      }
      if (modal.subject === "quiz") {
         switch (modal.action) {
            case "post":
               console.log(JSON.stringify(modal));
               return (
                  <QuizPostSubmit
                     close={close}
                     parentTestId={modal.data.parentTestId}
                  />
               );
            default:
               return <ErrorModal close={close} />;
         }
      }
      return <ErrorModal close={close} />;
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
