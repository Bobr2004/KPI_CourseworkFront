import { Oval } from "react-loader-spinner"

function Spinner({height} : {height: string}) {
  return (
    <Oval height={height} color="#000000" secondaryColor="#0000007a"/>
  )
}

export default Spinner