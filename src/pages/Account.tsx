import { AccountTest } from "../components/AccountTest";

function Account() {
   return (
      <div className="container mx-auto p-4 mt-8">
         <div className="max-w-[80ch] mx-auto flex  gap-4">
            <div className="flex flex-col gap-4">
               <div className="h-64 w-64 bg-stone-300 rounded-full"></div>
               <h2>Богдан Шовкопляс</h2>
               <p>82 бали</p>
               <p>Учень</p>
            </div>
            <div className="flex flex-col gap-2 max-w-[40ch] flex-grow">
               <AccountTest id={1} title="Бобр" receivedPoints={2} points={5} />
               <AccountTest id={1} title="Бобр" receivedPoints={4} points={5} />
            </div>
         </div>
      </div>
   );
}

export default Account;
