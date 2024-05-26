import { learnCredintialsAPI } from "../config/serverConfig";

type postTestType = {
   title: string;
};

// Patch lesson by id parameter
type patchTestType = {
   id: number;
   title?: string;
   author?: string;
};

const patchTest = async (patchLessonData: patchTestType) => {
   const response = await learnCredintialsAPI.patch(
      `/patch-test/${patchLessonData.id}`,
      patchLessonData
   );
   return response;
};

type postQuizType = {
   // testId quiz is bounded to 
   parentTestId: number;

   question: string;
   optionA: string;
   optionB: string;
   optionC: string;
   points: number;


   // correctOptions: OptionA, OptionB, OptionC
   correctOption: string;
};

const postQuiz = async (postQuizData: postQuizType) => {
   const response = await learnCredintialsAPI.patch(
      `/post-quiz/`,
      postQuizData
   );
   return response;
};
//
