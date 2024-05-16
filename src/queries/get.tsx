import axios from "axios";
import { config } from "../config/serverConfig";
const get = axios.create({
   baseURL: config.serverIP,
   method: "get"
});

// SEND JWT cookie and GET current user data (for global context)
type UserContextProps = {
   id: number;
   role: string;
   firstName: string;
   lastName: string;
};

const currentUser = async () => {
   const { data }: { data: UserContextProps } = await get(`/currentUser`);
   return data;
};
//

// GET ALL lessons basic info for home page
type LessonProps = {
   id: number;
   num: number;
   title: string;
};

const getLessons = async () => {
   const { data }: { data: LessonProps } = await get("/getLessons");
   return data;
};
//

// GET ALL theory and test basic info for SPECIFIC lesson
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

const getLesson = (id: number) => async () => {
   const { data }: { data: LessonExpandData } = await get(`/getLesson/${id}`);
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
   const { data }: { data: TheoryPageProps } = await get(`/getTheory/${id}`);
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
   const { data }: { data: TestPageProps } = await get(`/getTest/${id}`);
   return data;
};
//

export { getLesson, getLessons, getTheory, getTest, currentUser };
