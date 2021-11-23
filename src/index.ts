import InputTextBuilder from "./Components/InputBuilder";
import { SwitchBuilder } from "./Components/Switch";
import { CheckInputBuilder } from "./Components/CheckInputCore";
import { apiBuilder as apiB } from "./Builders/api";
import { yupBuilder as yupB } from "./Builders/yup";
import { createComponent as createComponentB } from "./Builders/component";
import { localStorageBuilder as lcB } from "./Builders/localStorage";
import { createRouter as createRouterB } from "./Builders/routes";
import { useToggle } from "./Hooks/useToggle";
import { useSlider } from "./Hooks/useSlider";
import { usePaginator } from "./Hooks/usePagination";
import { useDebounce } from "./Hooks/useDebounce";
import { useBlurred } from "./Hooks/useBlurred";
import { RouterDevTools as RouterDevT } from "./Builders/routes/RouterDevTools/component";

export const UIBuilders = {
  InputTextBuilder: InputTextBuilder.InputTextBuilder,
  SwitchBuilder,
  CheckInputBuilder,
};

export const builders = {
  api: apiB,
  yup: yupB,
  component: createComponentB,
  localStorage: lcB,
  router: createRouterB,
};

export const RSKHooks = {
  useToggle,
  useSlider,
  usePaginator,
  useDebounce,
  useBlurred,
};

export const RouterDevTools = RouterDevT;
