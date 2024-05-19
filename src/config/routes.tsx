const routes = {
   home: "/",
   log: "/login",
   reg: "/registration",

   rating: "/rating",

   account: "/account/:id",
   theory: "/theory/:id",
   test: "/test/:id",

   toAccount: (id: number) => `/account/${id}`,
   toTheory: (id: number) => `/theory/${id}`,
   toTest: (id: number) => `/test/${id}`
};

export { routes };
