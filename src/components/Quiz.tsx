import { QuizProps } from "../queries/lessonQueries";

function Quiz({
   id,
   question,
   optionA,
   optionB,
   optionC,
   points,
   choose
}: QuizProps & { choose: (id: number, value: string) => void }) {
   const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
      choose(id, e.target.value);
   };
   return (
      <div className="bg-stone-200 hover-stone-cs">
         <div className="flex justify-between gap-2"><h3>{question}</h3> <p>{points}</p></div>
         <div>
            <label className="flex gap-2">
               <input type="radio" name={`${id}`} value="OptionA" onChange={handleChoose}/>
               <span>{optionA}</span>
            </label>
         </div>
         <div>
            <label className="flex gap-2">
               <input type="radio" name={`${id}`} value="OptionB" onChange={handleChoose}/>
               <span>{optionB}</span>
            </label>
         </div>
         <div>
            <label className="flex gap-2">
               <input type="radio" name={`${id}`} value="OptionC" onChange={handleChoose}/>
               <span>{optionC}</span>
            </label>
         </div>
      </div>
   );
}

export { Quiz };
