import { withRHF } from "react-starter-kit/stories/helpers/withRHF";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SelectTest } from "Components/Select";

type ComponentMetaType = typeof SelectTest;

export default {
  title: "Example/Select",
  component: SelectTest,
  decorators: [withRHF(false)],
} as ComponentMeta<ComponentMetaType>;

const Template: ComponentStory<ComponentMetaType> = (args) => {
  //@ts-ignore
  return <SelectTest />;
};

export const Primary = Template.bind({});
Primary.args = {
  name: "blob",
};
