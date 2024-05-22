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

export { deleteLesson, patchLesson };
