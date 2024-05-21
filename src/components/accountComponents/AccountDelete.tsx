import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AccountDelete() {
   return (
      <button className="hover-stone-cs bg-red-400 py-2 px-4">
         Видалити <FontAwesomeIcon icon={faTrash} />
      </button>
   );
}

export default AccountDelete;
