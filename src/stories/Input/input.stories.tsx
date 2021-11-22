import { DatePicker, Input } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import { withRHF } from "../helpers/withRHF";

type inputModeType =
  | "Default"
  | "Password"
  | "Lock"
  | "Editable"
  | "CalendarInput";
type propsType = { inputType: inputModeType } & typeof Input.Default;

export default {
  title: "Example/Input",
  component: Input.Default,

  decorators: [withRHF(false)],
} as ComponentMeta<propsType>;

const Template: ComponentStory<propsType> = (args) => {
  //@ts-ignore
  return React.createElement(Input[args.inputType], {
    ...args,
    name: "blob",
  });
};

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Fuck",
  inputType: "Default",
  error: "Default",
};

export const Password = Template.bind({});
Password.args = {
  placeholder: "Password",
  inputType: "Password",
};

export const Numeric = Template.bind({});
Numeric.args = {
  placeholder: "Number",
  format: "+ 8 #### ####",
  inputType: "Numeric",
};

export const Lock = Template.bind({});
Lock.args = {
  placeholder: "Lock",
  defaultValue: "Locked value",
  inputType: "Lock",
};

export const Editable = Template.bind({});
Editable.args = {
  placeholder: "Editable",
  inputType: "Editable",
};

export const CalendarInput = Template.bind({});
CalendarInput.args = {
  placeholder: "Date",
  inputType: "CalendarInput",
};
