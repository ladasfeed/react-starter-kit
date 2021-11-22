import InputTextBuilder from "./Components/InputBuilder";
import { SwitchBuilder } from "./Components/Switch";
import { CheckInputBuilder } from "./Components/CheckInputCore";
import { apiBuilder as apiB } from "./Builders/api";
import { yupBuilder as yupB } from "./Builders/yup";
import { createComponent as createComponentB } from "./Builders/component";
import { localStorageBuilder as lcB } from "./Builders/localStorage";
import { createRouter as createRouterB } from "./Builders/routes";

export const UIBuilders = {
  InputTextBuilder: InputTextBuilder.InputTextBuilder,
  SwitchBuilder,
  CheckInputBuilder,
};

export const apiBuilder = apiB;
export const yupBuilder = yupB;
export const createComponent = createComponentB;
export const localStorageBuilder = lcB;
export const createRouter = createRouterB;
