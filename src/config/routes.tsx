const routes = {
   home: "/",
   log: "/login",
   reg: "/registration",
   account: "/account/:id",
   theory: "/theory/:id",
   test: "/test/:id",

   toAccount(id: number) {
      return `/account/${id}`;
   },
   toTheory(id: number) {
      return `/theory/${id}`;
   },
   toTest(id: number) {
      return `/test/${id}`;
   }
};

export { routes };
