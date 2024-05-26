import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../contexts/ModalContext";

function PostElement() {
   const modals = useModal();
   return (
      <button
         className="fixed left-4 bottom-4 hover-stone-cs px-2"
         onClick={() =>
            modals?.openModal({
               subject: "element",
               data: {},
               action: "post"
            })
         }
      >
         Додати <FontAwesomeIcon icon={faPlus} />
      </button>
   );
}

export default PostElement;
