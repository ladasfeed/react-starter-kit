import InputTextBuilder from "./InputBuilder";
import { SwitchBuilder } from "./Switch";
import { CheckInputBuilder } from "./CheckInputCore";
import { CodeField, CodeFieldPropsType } from "Components/CodeField";

export const UIBuilders = {
  InputTextBuilder: InputTextBuilder.InputTextBuilder,
  SwitchBuilder,
  CheckInputBuilder,
  CodeField,
};

export declare type CodeFieldType = CodeFieldPropsType;
