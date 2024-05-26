import { learnCredintialsAPI } from "../config/serverConfig";




// Delete is able to delete test, theory, lesson or quiz (all by id). example:  /delete-quiz/23
type deleteElementDataType = {
   element: string;
   id: number;
};
// Delete lesson by id parameter
const deleteElement = async ({ element, id }: deleteElementDataType) => {
   const response = await learnCredintialsAPI.delete(
      `/delete-${element}/${id}`
   );
   return response;
};
//

type postElementDataType = {
   element: string;
   parentId: number;
   title: string;
};

//  children elements - lesson, test, theory, 


// Create lesson
const postElement = async (data: postElementDataType) => {
   const response = await learnCredintialsAPI.post(`/post-${data.element}/`, data);
   return response;
};
//

// Patch lesson by id parameter
type patchLessonType = {
   id: number;
   title: string;
};

const patchLesson = async (patchLessonData: patchLessonType) => {
   const response = await learnCredintialsAPI.patch(
      `/patch-lesson/${patchLessonData.id}`,
      patchLessonData
   );
   return response;
};
//



type patchTheoryType = {
   id: number;
   title?: string;
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

export { deleteElement, patchLesson, patchTheory, postElement };

export type { deleteElementDataType, postElementDataType };
