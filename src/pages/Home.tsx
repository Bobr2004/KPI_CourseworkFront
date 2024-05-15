import Lesson from "../components/Lesson";

function Home() {
   return (
      <div className="container mx-auto p-4">
         <h1 className="text-center text-4xl">Уроки</h1>
         <div className="max-w-[80ch] mx-auto mt-4 flex flex-col gap-4">
            <Lesson id={1} num={1} title={"intro"}/>
            <Lesson id={2} num={2} title={"bibro"}/>
         </div>
      </div>
   );
}

export default Home;
