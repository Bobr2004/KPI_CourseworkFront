import { learnCredintialsAPI } from "../config/serverConfig";

type submitTestData = {
   testId: number;
   quizes: selectedQuiz[];
};

type selectedQuiz = [id: number, option: "optionA" | "optionB" | "optionC"];

const submitTest = async (submitTest: submitTestData) => {
   const response = await learnCredintialsAPI.patch(
      `/submit-test/`,
      submitTest
   );
   return response;
};
