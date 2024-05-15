import "./Input.scss";

type InputType = {
   val: number | string;
   changeVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
   type: string;
   placeholder: string
};

function Input({ placeholder, type, val, changeVal }: InputType) {
   return (
      <label className="CompactInput bg-slate relative w-full sm:w-3/4 text-black text-lg">
         <input
            value={val}
            type={type}
            className="w-full p-2 pt-4 rounded-lg"
            placeholder=" "
            onChange={changeVal}
         />
         <span className="absolute top-3 left-2 transition-all text-neutral-500">
            {placeholder}
         </span>
      </label>
   );
}

export default Input;
