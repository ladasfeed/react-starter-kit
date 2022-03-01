import InputTextBuilder from "./InputBuilder";
import { SwitchBuilder } from "./Switch";
import { CheckInputBuilder } from "./CheckInputCore";
import { CodeField, CodeFieldPropsType } from "./CodeField";

export const UIBuilders = {
  InputTextBuilder: InputTextBuilder.InputTextBuilder,
  SwitchBuilder,
  CheckInputBuilder,
  CodeField,
};

// @TODO зачем?
export declare type CodeFieldType = CodeFieldPropsType;
