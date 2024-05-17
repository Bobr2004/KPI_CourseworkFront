import "./Input.scss";

type InputType = {
   val: number | string;
   changeVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
   type: string;
   placeholder: string;
};

function Input({ placeholder, type, val, changeVal }: InputType) {
   return (
      <label className="Input bg-slate relative w-full sm:w-3/4 text-stone-800 text-lg">
         <span className="transition-all p-1">
            {placeholder}
         </span>
         <input
            value={val}
            type={type}
            className="w-full p-2 rounded-lg bg-stone-200 hover-stone-cs focus-stone-cs"
            placeholder=" "
            onChange={changeVal}
         />
      </label>
   );
}

export default Input;
