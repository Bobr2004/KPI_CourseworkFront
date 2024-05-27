import { learnCredintialsAPI } from "../config/serverConfig";

// Delete is able to delete test, theory, lesson or quiz (all by id)
type deleteElementDataType = {
   element: string;
   id: number;
};

// Delete lesson by id parameter
const deleteElement = async ({ element, id }: deleteElementDataType) => {
   const { invalidate }: { invalidate: string } =
      await learnCredintialsAPI.delete(`/delete-${element}/${id}`);
   return invalidate;
};
//

// /delete-lesson/2

type postElementDataType = {
   element: string;
   parentId: number;
   title: string;
};

//  elements - lesson, test, theory,

// Create lesson
const postElement = async (data: postElementDataType) => {
   const response = await learnCredintialsAPI.post(`/post-${data.element}`, {
      title: data.title,
      parentId: data.parentId
   });
   return response;
};
//

// /post-test {parentElement: 2, title: "Mega nigga"}

// Patch element
type patchElementTitleType = {
   element: string;
   id: number;
   title: string;
};

const patchElementTitle = async ({
   element,
   id,
   title
}: patchElementTitleType) => {
   const response = await learnCredintialsAPI.patch(
      `/patch-title-${element}/${id}`,
      {
         title
      }
   );
   return response;
};
//

type patchTheoryType = {
   id: number;
   html?: string;
};

// Patch theory
const patchTheory = async (patchTheoryData: patchTheoryType) => {
   const response = await learnCredintialsAPI.patch(
      `/patch-theory/${patchTheoryData.id}`,
      patchTheoryData
   );
   return response;
};
//

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
   const response = await learnCredintialsAPI.post(`/post-quiz`, postQuizData);
   return response;
};

export { deleteElement, patchElementTitle, patchTheory, postElement, postQuiz };

export type {
   deleteElementDataType,
   postElementDataType,
   patchElementTitleType
};
