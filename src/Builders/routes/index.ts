type recursiveRouterType<T> = T extends string
   ? T
   : {
        [key in keyof T]: recursiveRouterType<T[key]>;
     } & { root: string };

export function createRouter<T>(rootRouter: T): recursiveRouterType<T> {
   let arrayOfRoutes: Array<any> = [];

   const routerCreator = (router: any, path: string) => {
      arrayOfRoutes.push("—————");
      let temp: any = {};
      temp.root = path ? path : "/";
      arrayOfRoutes.push(temp.root);

      let key: keyof typeof router;
      for (key in router) {
         if (key == "root") {
            continue;
         }

         if (typeof router[key] == "object") {
            const customRoot = router[key]["root"];

            if (customRoot) {
               temp[key] = routerCreator(router[key], `${path}${customRoot}`);
            } else {
               temp[key] = routerCreator(router[key], `${path}/${key}`);
            }
         } else if (typeof router[key] == "string") {
            if (router[key].includes("!")) {
               temp[key] = router[key].substr(1);
               arrayOfRoutes.push(temp[key]);
            } else {
               temp[key] = path + router[key];
               arrayOfRoutes.push(temp[key]);
            }
         }
      }
      return temp;
   };

   const router = routerCreator(rootRouter, "");

   router.array = arrayOfRoutes;
   return router;
}
