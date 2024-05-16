import { Oval } from "react-loader-spinner"

function Spinner({height} : {height: string}) {
  return (
    <Oval height={height} color="#fff" secondaryColor="#ffffff7a"/>
  )
}

export default Spinner