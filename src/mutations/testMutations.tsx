import { learnCredintialsAPI } from "../config/serverConfig";

type AnswerOptions = "OptionA" | "OptionB" | "OptionC";

type submitTestData = {
   [id: `${number}`]: string;
};

// Example:
const userAnswers: submitTestData = {
   11: "OptionA",
   12: "OptionA",
   43: "OptionB",
   64: "OptionC" // more can be added
};

const submitTest = async (submitTest: submitTestData) => {
   const response = await learnCredintialsAPI.post(
      `/submit-test/`,
      submitTest
   );
   return response;
};
