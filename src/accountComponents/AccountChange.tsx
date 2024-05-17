import Button from "../components/Button";

type AccountChnageType = {
   id: number;
   email: string;
};

function AccountChange({ id, email }: AccountChnageType) {
   return (
      <div className="flex flex-col justify-between gap-2 border border-stone-600 p-2 bg-stone-200 rounded-lg w-1/2 h-64">
         <div>
            <p className="text-stone-600 text-sm text-center mb-2">
               Ця інформація видна тільки вам*
            </p>

            <p>Електронна адреса:</p>
            <p>{email}</p>
         </div>
         <div className="flex flex-col gap-1">
            <Button onClick={() => {}}>Змінити email</Button>
            <Button onClick={() => {}}>Змінити пароль</Button>
         </div>
      </div>
   );
}

export default AccountChange;
