import { NavLink } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { routes } from "../../config/routes";

type TestResultResponseProps = {
   close: () => void;
   title: string;
   receivedPoints: number;
   points: number;
};

function TestResultResponse({
   close,
   title,
   receivedPoints,
   points
}: TestResultResponseProps) {
   const isGreat = (receivedPoints * 100) / points >= 60;

   return (
      <ModalTemplate title={`Ви ${isGreat ? "успішно " : ""}склали тест`}>
         <div className="flex flex-col gap-1 mb-4 items-center">
            <p>{title}</p>
            <p>
               Оцінка:{" "}
               <b
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
               Залишитися
            </button>
            <NavLink
               to={routes.home}
               className="px-4 py-1 rounded-lg bg-green-400 hover-stone-cs w-1/2 text-center"
               onClick={close}
            >
               На головну
            </NavLink>
         </div>
      </ModalTemplate>
   );
}

export default TestResultResponse;
