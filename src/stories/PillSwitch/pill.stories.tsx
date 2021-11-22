import { withRHF } from "../helpers/withRHF";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { PillSwitch } from "./index";

type ComponentMetaType = typeof PillSwitch;

export default {
  title: "Example/Pill",
  component: PillSwitch,
  decorators: [withRHF(false)],
} as ComponentMeta<ComponentMetaType>;

const Template: ComponentStory<ComponentMetaType> = (args) => {
  return (
    <div>
      <PillSwitch
        {...args}
        options={[
          {
            value: "12",
            customPayload: {
              text: "Hui",
            },
          },
          {
            value: "13",
            customPayload: {
              text: "Pizda",
            },
          },
          {
            value: "14",
            customPayload: {
              text: "Jiggurda",
            },
          },
        ]}
      />
    </div>
  );
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  name: "blob",
  inputType: "checkbox",
};
