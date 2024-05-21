import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AccountLeave() {
   return (
      <button className="hover-stone-cs bg-blue-400 py-2 px-4">
         Вийти <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
   );
}

export default AccountLeave;
