import { learnCredintialsAPI } from "../config/serverConfig";

type submitTestData = {
   testId: number;
   [id: `${number}`]: string;
};

type submitTestResponseData = {
   id: number;
   title: string;
   receivedPoints: number;
   points: number;
};
const submitTest = async (submitTest: submitTestData) => {
   const { data }: { data: submitTestResponseData } =
      await learnCredintialsAPI.post(`/submit-test`, submitTest);
   return data;
};

export { submitTest };
