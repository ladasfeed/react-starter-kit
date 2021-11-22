import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styles from "./index.module.css";
import { Control, useFormContext } from "react-hook-form";
import cn from "classnames";

export type SwitchBuilderType = {
  classNames: {
    container?: string;
    input?: string;
    circleContainer?: string;
    circle?: string;
  };
};

export type SwitchPropsType = {
  name: string;
  control: Control<any>;
} & HTMLAttributes<HTMLDivElement>;

/**
 * --circle-width
 * --padding
 * --border-radius
 * */
export const SwitchBuilder = (builderProps: SwitchBuilderType) => {
  const Switch = (props: SwitchPropsType) => {
    const { control } = useFormContext();
    return (
      <label
        className={cn(builderProps.classNames.container, styles.container)}
      >
        <input
          type="checkbox"
          /*{...props.control.register(props.name)}*/
          {...control.register(props.name)}
          className={cn(builderProps.classNames.input, styles.input)}
        />
        <div
          className={cn(
            styles.switch_container,
            builderProps.classNames.circleContainer
          )}
        >
          <div
            className={cn(builderProps.classNames.circle, styles.switch_circle)}
          />
        </div>
      </label>
    );
  };

  return {
    default: Switch,
  };
};
