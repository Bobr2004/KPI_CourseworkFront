import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditElement({
   onClick
}: {
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
   return (
      <button
         className="hover-stone-cs  px-1 absolute z-[2] -top-2 -right-6 text-sm"
         onClick={onClick}
      >
         <FontAwesomeIcon icon={faPen} />
      </button>
   );
}

export default EditElement;
