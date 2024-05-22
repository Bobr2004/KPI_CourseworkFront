import { ReactNode, useEffect } from "react";

type OverlayProps = {
   children: ReactNode;
};

function Overlay({ children }: OverlayProps) {
   useEffect(() => {
      const body = document.querySelector("body");
      if (body) {
         body.style.height = "100vh";
         body.style.overflow = "hidden";
      }
      return () => {
         if (body) {
            body.style.height = "auto";
            body.style.overflow = "scroll";
         }
      };
   }, []);
   return (
      <div className="fixed inset-0 w-full h-full transparentBg flex justify-center items-center z-10">
         {children}
      </div>
   );
}

export default Overlay;
