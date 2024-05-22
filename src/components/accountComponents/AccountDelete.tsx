import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../contexts/ModalContext";

function AccountDelete() {
   const modals = useModal();
   return (
      <button
         className="hover-stone-cs bg-red-400 py-2 px-4"
         onClick={() => {
            modals?.openModal("delete");
         }}
      >
         Видалити <FontAwesomeIcon icon={faTrash} />
      </button>
   );
}

export default AccountDelete;
