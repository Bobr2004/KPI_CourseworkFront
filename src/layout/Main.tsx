import { ReactNode } from "react";

type MainProps = {
   children: ReactNode;
};

function Main({ children }: MainProps) {
   return <main className=" flex-grow">{children}</main>;
}

export default Main;
