import { learnCredintialsAPI } from "../config/serverConfig";

// Delete lesson by id parameter
const deleteLesson = async (id: number) => {
   const response = await learnCredintialsAPI.delete(`/delete-lesson/${id}`);
   return response;
};
//

// Patch lesson by id parameter
type patchLessonType = {
   title: string;
};

const patchLesson = async (id: number, patchLessonData: patchLessonType) => {
   const response = await learnCredintialsAPI.patch(
      `/delete-lesson/${id}`,
      patchLessonData
   );
   return response;
};
//

// Delete theory by id parameter
const deleteTheory = async (id: number, patchTheoryData: patchTheoryType) => {
   const response = await learnCredintialsAPI.delete(
      `/delete-theory/${id}`
   );
   return response;
};
//

type patchTheoryType = {
   id: number;
   title?: string;
   html?: string;
   author?: string;
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

// Post theory
const postTheory = async (patchTheoryData: patchTheoryType) => {
   const response = await learnCredintialsAPI.patch(
      `/post-theory/`,
      patchTheoryData
   );
   return response;
};
// 



export { deleteLesson, patchLesson, deleteTheory, patchTheory, postTheory };
