import "./Input.scss";

function Input() {
  return (
    <label className="Input bg-slate relative w-full sm:w-3/4 text-black text-lg">
      <input type="text" className="w-full p-2 pt-4 rounded-lg" placeholder=" "/>
      <span className="absolute top-3 left-2 transition-all text-neutral-500">Email</span>
    </label>
  )
}

export default Input