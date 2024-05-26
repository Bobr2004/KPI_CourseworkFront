import { learnCredintialsAPI } from "../config/serverConfig";
// Patch lesson by id parameter
type patchTestType = {
   id: number;
   title?: string;
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

export {postQuiz, patchTest}
