import { learnAPI } from "../config/serverConfig";

// GET ALL lessons basic info for home page
type LessonProps = {
   id: number;
   num: number;
   title: string;
};

const getLessons = async () => {
   const { data }: { data: LessonProps[] } = await learnAPI.get("/getLessons");
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
};

const getLesson = (id: number) => async () => {
   const { data }: { data: LessonExpandProps } = await learnAPI.get(
      `/getLesson/${id}`
   );
   return data;
};
//

// GET all data about SPECIFIC Theory

type TheoryPageProps = {
   id: number;
   title: string;
   html: string;
   author: string;
};
const getTheory = (id: number) => async () => {
   const { data }: { data: TheoryPageProps } = await learnAPI.get(
      `/getTheory/${id}`
   );
   return data;
};
//

// GET all data about SPECIFIC Test
type TestPageProps = {
   id: number;
   title: string;
   quizes: QueizProps[];
};

type QueizProps = {
   id: number;
   question: string;
   option1: string;
   option2: string;
   option3: string;
};

const getTest = (id: number) => async () => {
   const { data }: { data: TestPageProps } = await learnAPI.get(
      `/getTest/${id}`
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
   QueizProps
};
