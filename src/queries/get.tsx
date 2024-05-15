import axios from "axios";

// если шо то types тут так для кайфа, чтоб тебе по файлам не лазить, я их потом уберу

const get = axios.create({
   baseURL: "https://some-domain.com/api/v2",
   method: "get"
});

const getLessons = async () => {
   const { data } = await get("/getLessons");
   return data;
};

// Type for getLessons data
type LessonProps = {
   id: number;
   num: number;
   title: string;
};

const getLesson = (id: number) => async () => {
   const { data } = await get(`/getLesson/${id}`);
   return data;
};

// type for getLesson data
type LessonExpandData = {
   theoryList: TheoryProps[];
   testList: TestProps[];
};

type TheoryProps = {
   id: number;
   title: string;
};

type TestProps = {
   id: number;
   title: string;
   questionsAmount: number;
};
