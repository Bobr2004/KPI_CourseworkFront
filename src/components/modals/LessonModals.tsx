import ModalTemplate from './ModalTemplate'
import StatusButton from '../StatusButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import { deleteLesson } from '../../mutations/adminMutations'

function LessonDeleteSubmit({ close, id }: { close: () => void, id:number }) {
   const {isPending, isError, data:res, error, mutate} = useMutation({mutationFn: deleteLesson})

   const submit = ()=>{
      mutate(id)
   }
  return (
   <ModalTemplate title={"Підтвердити видалення теми"}>
   <div className="flex gap-4 justify-center">
      <button
         className="px-4 py-1 rounded-lg bg-stone-100 hover-stone-cs w-1/2"
         onClick={close}
      >
         Відміна
      </button>
      <StatusButton
         isPending={isPending}
         isError={isError}
         error={`${error}`}
         res={res}
         className="px-4 py-1 w-1/2"
      >
         <button
            className="px-4 py-1 rounded-lg bg-red-400 hover-stone-cs w-1/2"
            onClick={submit}
         >
            Підтвердити <FontAwesomeIcon icon={faTrash} />
         </button>
      </StatusButton>
   </div>
</ModalTemplate>
  )
}

export default LessonDeleteSubmit