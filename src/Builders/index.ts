import { apiBuilder as apiB } from "./api";
import { yupBuilder as yupB } from "./yup";
import { createComponentBuilder } from "./component";
import { localStorageBuilder as lcB } from "./localStorage";
import { createRouter as createRouterB } from "./routes";

export const builders = {
  api: apiB,
  yup: yupB,
  component: createComponentBuilder,
  localStorage: lcB,
  router: createRouterB,
};
