import { learnAPI } from "../config/serverConfig";

// GET ALL lessons basic info for home page
type LessonProps = {
   id: number;
   num: number;
   title: string;
};

const getLessons = async () => {
   const { data }: { data: LessonProps[] } = await learnAPI.get("/lessons");
   return data;
};
//

// GET ALL theory and test basic info for SPECIFIC lesson
type LessonExpandProps = {
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
   points: number
};

const getLesson = (id: number) => async () => {
   const { data }: { data: LessonExpandProps } = await learnAPI.get(
      `/lesson/${id}`
   );
   return data;
};
//

// GET all data about SPECIFIC Theory

type TheoryPageProps = {
   id: number;
   lessonTitle: string;
   title: string;
   html: string;
   author: string;
};
const getTheory = (id: number) => async () => {
   const { data }: { data: TheoryPageProps } = await learnAPI.get(
      `/theory/${id}`
   );
   return data;
};
//

// GET all data about SPECIFIC Test
type TestPageProps = {
   id: number;
   lessonTitle: string;
   title: string;
   quizes: QuizProps[];
   points: number;
   author: string;
};

// Test points is equal to all Quiz points

type QuizProps = {
   id: number;
   question: string;
   optionA: string;
   optionB: string;
   optionC: string;
   points: number
};

const getTest = (id: number) => async () => {
   const { data }: { data: TestPageProps } = await learnAPI.get(
      `/test/${id}`
   );
   return data;
};
//

export { getLesson, getLessons, getTheory, getTest };

export type {
   LessonProps,
   LessonExpandProps,
   TheoryProps,
   TestProps,
   TheoryPageProps,
   TestPageProps,
   QuizProps
};
