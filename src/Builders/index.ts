import { apiBuilder as apiB } from "./api";
import { yupBuilder as yupB } from "./yup";
import { createComponent as createComponentB } from "./component";
import { localStorageBuilder as lcB } from "./localStorage";
import { createRouter as createRouterB } from "./routes";

export const builders = {
  api: apiB,
  yup: yupB,
  component: createComponentB,
  localStorage: lcB,
  router: createRouterB,
};
