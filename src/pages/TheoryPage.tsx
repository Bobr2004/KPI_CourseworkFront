import { useParams } from "react-router-dom"

function TheoryPage() {
   const {id} = useParams();
  return (
    <div>TheoryPage {id}</div>
  )
}

export default TheoryPage