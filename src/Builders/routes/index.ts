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

    let fieldName: keyof typeof router;
    for (fieldName in router) {
      if (fieldName == "root") {
        continue;
      }
      const routerElementType = typeof router[fieldName];

      /**
       * If field is object - call this function with this field
       * and define prefixPath.
       * If a string - add value to temp router object by fieldName.
       * */
      switch (routerElementType) {
        case "object":
          const customRoot = router[fieldName]["root"];
          tempRouter[fieldName] = routerCreator(
            router[fieldName],
            `${prefixPath}${customRoot ? `/${customRoot}` : fieldName}`
          );
          break;
        case "string":
          if (router[fieldName].includes("!")) {
            tempRouter[fieldName] = router[fieldName].substr(1);
          } else {
            tempRouter[fieldName] = prefixPath + router[fieldName];
          }
          arrayOfRoutes.push(tempRouter[fieldName]);
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
