import { learnCredintialsAPI } from "../config/serverConfig";

type postTestType = {
   title: string;
};

// Create lesson
const PostTest = async ({ title }: postTestType) => {
   const response = await learnCredintialsAPI.post(`/post-lesson/`, { title });
   return response;
};
//

// Delete lesson by id parameter
const deleteTest = async (id: number) => {
   const response = await learnCredintialsAPI.delete(`/delete-lesson/${id}`);
   return response;
};
//

// Patch lesson by id parameter
type patchTestType = {
   id: number;
   title?: string;
   author?: string;
};

const patchTest = async (patchLessonData: patchTestType) => {
   const response = await learnCredintialsAPI.patch(
      `/patch-lesson/${patchLessonData.id}`,
      patchLessonData
   );
   return response;
};
//
