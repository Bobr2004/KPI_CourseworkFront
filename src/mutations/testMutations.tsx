import { learnCredintialsAPI } from "../config/serverConfig";

type submitTestData = {
   testId: number;
   [id: `${number}`]: string;
};

type submitTestResponseData = {
   id: number;
   title: string;
   receivedPoints: number;
   points: number;
};

type sendTestDataType = {
   testId: number;
   quizzes: quizType[];
};

type quizType = [id: number, answer: string];

const submitTest = async (submitTest: submitTestData) => {
   const quizzes = Object.entries(submitTest).filter(
      (el) => el[0] !== "testId"
   );
   const sendData = {
      testId: submitTest.testId,
      quizzes
   };

   const { data }: { data: submitTestResponseData } =
      await learnCredintialsAPI.post(`/submit-test`, sendData);
   return data;
};

export { submitTest };
