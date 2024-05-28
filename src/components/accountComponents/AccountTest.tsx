import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";
import { AccountTestProps } from "../../queries/userQueries";
import { useModal } from "../../contexts/ModalContext";
import { useUser } from "../../contexts/UserContext";

function AccountTest({ id, title, points, receivedPoints }: AccountTestProps) {

   const redirect = useNavigate();
   const modals = useModal();
   const currentUser = useUser();
   

   const onClick = () => {
      if (currentUser?.testList.find((el) => el.id === id)) {
         modals?.openModal({
            subject: "test",
            data: { testId: id },
            action: "passed"
         });
         return;
      } else redirect(routes.toTest(id));
   };


   return (
      <article>
         <button
            onClick={onClick}
            className={`flex gap-4 justify-between bg-stone-100 p-2 hover-stone-cs w-full`}
         >
            <h3>{title}</h3>
            <span className={(receivedPoints * 100 / points) >= 60 ? "text-green-500" : "text-red-500"}>
               {receivedPoints}/{points}
            </span>
         </button>
      </article>
   );
}

export { AccountTest };
