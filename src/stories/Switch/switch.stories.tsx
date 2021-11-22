import {withRHF} from "../helpers/withRHF";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Switch} from "./index";
import React from "react";

type ComponentMetaType = typeof Switch.default

export default {
    title: 'Example/Switch',
    component: Switch.default,
    decorators: [withRHF(false)],
} as ComponentMeta<ComponentMetaType>;

const Template: ComponentStory<ComponentMetaType> = (args) => {

    //@ts-ignore
    return <Switch.default {...args} />
};

export const Primary = Template.bind({})
Primary.args = {
    name: 'blob'
};

