/** Recursive type for correct typing of object.
 * Just like a function.
 * */
type recursiveRouterType<T> = T extends string
  ? T
  : {
      [key in keyof T]: recursiveRouterType<T[key]>;
    } & { root: string };

export function createRouter<T>(
  rootRouter: T
): recursiveRouterType<T> & { array: Array<string> } {
  /* Array of routes for devtools */
  let arrayOfRoutes: Array<any> = [];

  /**
   * router: router object,
   * path: prefix string
   * */
  const routerCreator = (
    router: {
      [key: string]: any;
    },
    prefixPath: string
  ) => {
    /* Delimiter */
    arrayOfRoutes.push("—————");
    let tempRouter: any = {};

    /**
     * Define root field.
     * Overriding root will not override object's field name.
     * */
    tempRouter.root = prefixPath ? prefixPath : "/";
    arrayOfRoutes.push(tempRouter.root);

    let key: keyof typeof router;
    for (key in router) {
      if (key == "root") {
        continue;
      }
      const routerElementType = typeof router[key];

      switch (routerElementType) {
        case "object":
          const customRoot = router[key]["root"];
          tempRouter[key] = routerCreator(
            router[key],
            `${prefixPath}/${customRoot || key}`
          );
          break;
        case "string":
          if (router[key].includes("!")) {
            tempRouter[key] = router[key].substr(1);
          } else {
            tempRouter[key] = prefixPath + router[key];
          }
          arrayOfRoutes.push(tempRouter[key]);
          break;
        default:
          break;
      }
    }
    return tempRouter;
  };

  const router = routerCreator(rootRouter, "");

  router.array = arrayOfRoutes;
  return router;
}
