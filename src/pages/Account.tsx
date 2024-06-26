import { useParams } from "react-router-dom";
import AccountData from "../components/accountComponents/AccountData";
import { AccountTest } from "../components/accountComponents/AccountTest";
import { getAccount } from "../queries/userQueries";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

function Account() {
   let { id } = useParams();
   const { isPending, isError, data, error } = useQuery({
      queryKey: [`account/${id}`],
      queryFn: getAccount(Number(id))
   });

   let htm: JSX.Element;

   if (isPending)
      htm = (
         <div className="flex justify-center">
            <Spinner height="4.5rem" />
         </div>
      );
   else if (isError) htm = <div>Error: {error.message}</div>;
   else
      htm = (
         <>
            <AccountData
               id={data.id}
               role={data.role}
               email={data.email}
               firstName={data.firstName}
               lastName={data.lastName}
               score={data.score}
               performance={data.performance}
            />
            <h4 className="text-center text-2xl">Архів тестів</h4>
            <div className="flex flex-col gap-2 flex-grow">
               {data.testList ? (
                  data.testList.map(({ id, title, receivedPoints, points }) => (
                     <AccountTest
                        id={id}
                        title={title}
                        receivedPoints={receivedPoints}
                        points={points}
                        key={points}
                     />
                  ))
               ) : (
                  <p className="text-center">
                     <b className="text-stone-600">
                        Студент ще не пройшов жодного тесту
                     </b>
                  </p>
               )}
            </div>
         </>
      );

   return (
      <div className="container mx-auto p-4 md:mt-8">
         <div className="max-w-[80ch] mx-auto flex flex-col  gap-4">{htm}</div>
      </div>
   );
}

export default Account;
