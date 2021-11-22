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
  //@ts-ignore
  inputType: "Default",
  error: "Default",
};

export const Password = Template.bind({});
Password.args = {
  placeholder: "Password",
  //@ts-ignore
  inputType: "Password",
};

export const Numeric = Template.bind({});
Numeric.args = {
  placeholder: "Number",
  //@ts-ignore
  format: "+ 8 #### ####",
  inputType: "Numeric",
};

export const Lock = Template.bind({});
Lock.args = {
  placeholder: "Lock",
  defaultValue: "Locked value",
  //@ts-ignore
  inputType: "Lock",
};

export const Editable = Template.bind({});
Editable.args = {
  placeholder: "Editable",
  //@ts-ignore
  inputType: "Editable",
};

export const CalendarInput = Template.bind({});
CalendarInput.args = {
  placeholder: "Date",
  //@ts-ignore
  inputType: "CalendarInput",
};
