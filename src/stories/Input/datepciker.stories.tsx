import { withRHF } from "../helpers/withRHF";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DatePicker } from "./index";

export default {
  title: "Example/Calendar",
  component: DatePicker,
  decorators: [withRHF(false)],
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
  return <DatePicker {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  name: "fuck",
};

export {};
