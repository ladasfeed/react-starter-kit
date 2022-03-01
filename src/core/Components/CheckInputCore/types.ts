import { FC, HTMLAttributes } from "react";
import { AtLeast } from "../../types";
import { Control } from "react-hook-form";

// COMPONENTS PROPS TYPES

// Base type for component
type CheckBoxBaseType = {
  control: any;
  inputType: "checkbox" | "radio";
  direction?: "right" | "left";
  name: string;
};

// Entire checkbox type
export type CheckBoxType<T> = {
  label?: string;
  customPayload?: T;
  value?: string;
} & HTMLAttributes<HTMLInputElement> &
  CheckBoxBaseType;

// --
export type CheckBoxGroupType<T> = {
  className?: string;
  checkboxClassName?: string;
  /*@TODO реализовать */
  compose?: {
    value: "row" | "column";
    gap: string;
  };
  options: Array<{
    value: string;
    customPayload?: T;
    label?: string;
  }>;
  error?: string;
} & CheckBoxBaseType;

/** BUILDER */

// Variants of building
export type checkboxBuilderMode = "custom" | "default";

export type CheckboxCreatorOptionalTypes<T> = {
  icons: {
    checkbox: {
      checked: FC<any>;
      unchecked: FC<any>;
    };
    radio: {
      checked: FC<any>;
      unchecked: FC<any>;
    };
  };
  customElement: {
    component: FC<T>;
  };
};

// Type for builder. If default mode - requires icons. Else - customElement.
export type CheckboxCreatorType<F extends checkboxBuilderMode, T> = {
  classNames: {
    input?: string;
    container?: string;
    group?: string;
    icon?: string;
    label?: string;
  };
} & (F extends "default"
  ? AtLeast<CheckboxCreatorOptionalTypes<T>, "icons">
  : AtLeast<CheckboxCreatorOptionalTypes<T>, "customElement">);
