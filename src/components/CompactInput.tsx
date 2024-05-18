import "./Input.scss";

type InputType = {
   val: number | string;
   changeVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
   type: string;
   placeholder: string
};

function CompactInput({ placeholder, type, val, changeVal }: InputType) {
   return (
      <label className="CompactInput bg-slate relative w-full text-black">
         <input
            value={val}
            type={type}
            className="w-full px-2 pt-2 pb-1 hover-stone-cs focus-stone-cs"
            placeholder=" "
            onChange={changeVal}
         />
         <span className="absolute top-1 left-2 transition-all text-neutral-500">
            {placeholder}
         </span>
      </label>
   );
}

export default CompactInput;
