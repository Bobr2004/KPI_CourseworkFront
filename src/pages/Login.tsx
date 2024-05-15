import Input from "../components/Input"
import ModalForm from "../components/ModalForm"

function Login() {
  return (
    <div className="container mx-auto flex justify-center p-8">
      <ModalForm>
         <h1 className="text-center text-4xl">Login</h1>
         <Input/>
      </ModalForm>
    </div>
  )
}

export default Login