import {withRHF} from "../helpers/withRHF";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {CheckInput} from "./index";

type ComponentMetaType = typeof CheckInput.default

export default {
    title: 'Example/Check',
    component: CheckInput.default,
    decorators: [withRHF(false)],
} as ComponentMeta<ComponentMetaType>;

const Template: ComponentStory<ComponentMetaType> = (args) => {

    //@ts-ignore
    return <div>
        <CheckInput.default {...args} value={'1'} label={'1'}/>
        <CheckInput.default {...args} value={'1'} label={'2'}/>
        <CheckInput.default {...args} value={'1'} label={'3'}/>
    </div>
};

export const Checkbox = Template.bind({})
Checkbox.args = {
    name: 'blob',
    inputType: 'checkbox'
};

export const Radio = Template.bind({})
Radio.args = {
    name: 'blob',
    inputType: 'radio'
};



