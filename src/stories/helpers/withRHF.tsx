import { action } from "@storybook/addon-actions";
import React from "react";
import { VFC, ReactNode, FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";

const StorybookFormProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export const withRHF = (showSubmitButton: boolean) => (
  Story: FC
): StoryFnReactReturnType => (
  <StorybookFormProvider>
    <Story />
    {showSubmitButton && <button type="submit">Submit</button>}
  </StorybookFormProvider>
);
