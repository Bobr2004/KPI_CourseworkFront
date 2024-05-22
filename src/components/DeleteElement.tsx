import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeleteElement({
   onClick
}: {
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
   return (
      <button
         className="hover-stone-cs bg-red-400 px-1 absolute z-[2] -top-2 -right-2 text-sm"
         onClick={onClick}
      >
         <FontAwesomeIcon icon={faTrash} />
      </button>
   );
}

export default DeleteElement;
