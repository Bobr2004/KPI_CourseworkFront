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
      `/patch-lesson/${patchLessonData.id}`,
      patchLessonData
   );
   return response;
};
//
