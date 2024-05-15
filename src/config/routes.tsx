const routes = {
   home: "/",
   log: "login",
   reg: "registration",
   account(id: number) {
      return `account/${id}`;
   }
};

export { routes };
