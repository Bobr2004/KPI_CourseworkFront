import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../contexts/ModalContext";

function AccountLeave() {
   const modals = useModal();
   return (
      <button
         className="hover-stone-cs bg-blue-400 py-2 px-4"
         onClick={() => {modals?.openModal("exit")}}
      >
         Вийти <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
   );
}

export default AccountLeave;
