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

export {properQuestionsWord, properPointsWord, coreDigit}