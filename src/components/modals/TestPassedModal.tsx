import ModalTemplate from "./ModalTemplate";
import { useUser } from "../../contexts/UserContext";

function TestPassedModal({
   close,
   testId
}: {
   close: () => void;
   testId: number;
}) {
   const user = useUser();

   const { title, receivedPoints, points } =
      user?.testList.find((el) => el.id === testId) || {};

   return (
      <ModalTemplate title={"Ви вже пройшли це тест"}>
         <div className="flex flex-col gap-1 mb-4 items-center">
            <p>{title}</p>
            <p>
               Оцінка: <b
                  className={
                     receivedPoints &&
                     points &&
                     (receivedPoints * 100) / points > 60
                        ? "text-green-500"
                        : "text-red-500"
                  }
               >
                  {receivedPoints}/{points}
               </b>
            </p>
         </div>
         <div className="flex gap-4 justify-center">
            <button
               className="px-4 py-1 rounded-lg bg-stone-100 hover-stone-cs w-1/2"
               onClick={close}
            >
               Відміна
            </button>
            <button
               className="px-4 py-1 rounded-lg bg-green-400 hover-stone-cs w-1/2"
               onClick={close}
            >
               Зрозуміло
            </button>
         </div>
      </ModalTemplate>
   );
}

export default TestPassedModal;
