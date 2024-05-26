import ModalTemplate from "./ModalTemplate";

function ErrorModal({ close }: { close: () => void }) {
   return (
      <ModalTemplate title={"Щось пішло не так("}>
         <div className="flex gap-4 justify-center">
            <button
               className="px-4 py-1 rounded-lg bg-stone-100 hover-stone-cs w-1/2"
               onClick={close}
            >
               Відміна
            </button>
            <button
               className="px-4 py-1 rounded-lg bg-red-400 hover-stone-cs w-1/2"
               onClick={close}
            >
               Зрозуміло
            </button>
         </div>
      </ModalTemplate>
   );
}

export default ErrorModal;
