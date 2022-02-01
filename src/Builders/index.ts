import { apiBuilder as apiB } from "./api";
import { yupBuilder as yupB } from "./yup";
import { createComponentBuilder } from "./component";
import { localStorageBuilder as lcB } from "./localStorage";
import { createRouter as createRouterB } from "./routes";
import { lazyLoadBuilder } from "./lazyLoadComponent";
import { MediaProviderFactory } from "./MediaProvider";

export const builders = {
  api: apiB,
  yup: yupB,
  component: createComponentBuilder,
  localStorage: lcB,
  router: createRouterB,
  lazyLoad: lazyLoadBuilder,
  media: MediaProviderFactory,
};
