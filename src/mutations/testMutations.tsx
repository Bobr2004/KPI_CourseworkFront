import { learnCredintialsAPI } from "../config/serverConfig";

type submitTestData = {
   [id: `${number}`]: string;
};
const submitTest = async (submitTest: submitTestData) => {
   const response = await learnCredintialsAPI.post(`/submit-test`, submitTest);
   return response;
};

export { submitTest };
