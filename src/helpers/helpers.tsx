const properQuestionsWord = (num: number): string => {
   if ([1, 2, 3, 4].includes(num)) return "питання";
   return "питань";
};

const properPointsWord = (num: number): string => {
   if (num === 1) return "бал";
   if ([2, 3, 4].includes(num)) return "бали";
   return "балів";
};

const coreDigit = (num: number): number => {
   if (num % 100 > 10 && num % 100 <= 20) return num % 100;
   return num % 10;
};

const validateEmail = (email: string): boolean => {
   return !!email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   );
};

type validateUserFormFieldsType = {
   lastName?: string;
   firstName?: string;

   email?: string;

   password?: string;
   confirmPassword?: string;
};

const validateUserFormAndSetError = (
   userFields: validateUserFormFieldsType,
   setError: React.Dispatch<React.SetStateAction<string>>
): boolean => {
   for (let field of Object.entries(userFields)) {
      if (field[1] === "") {
         setError("Всі поля мають бути заповнені!");
         return false;
      }
   }

   const { email, password, confirmPassword } = userFields;

   if (email && !validateEmail(email)) {
      setError("Неправильний формат email");
      return false;
   }

   if (password && password.length < 8) {
      setError("Пароль має містити не менше 8 символів!");
      return false;
   }
   if (password && password !== confirmPassword) {
      setError("Пароль та підтвердження не збігаються!");
      return false;
   }

   setError("");
   return true;
};



const wait = (sec = 0.5) =>
   new Promise((resolve, _) => setTimeout(resolve, sec * 1000));



export {
   properQuestionsWord,
   properPointsWord,
   coreDigit,
   validateEmail,
   validateUserFormAndSetError,
   wait
};
