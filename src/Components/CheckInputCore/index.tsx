import React, { FC, HTMLAttributes } from "react";
import { Control, useFormContext } from "react-hook-form";
import cn from "classnames";
import styles from "./index.module.css";
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type CheckboxCreatorOptionalTypes<T> = {
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
type CheckboxCreatorType<T, F extends checkboxBuilderType> = {
  classNames: {
    input?: string;
  };
} & (F extends "default"
  ? AtLeast<CheckboxCreatorOptionalTypes<T>, "icons">
  : AtLeast<CheckboxCreatorOptionalTypes<T>, "customElement">);

type CheckBoxBaseType = {
  control: Control<any>;
  inputType: "checkbox" | "radio";
  direction?: "right" | "left";
  name: string;
};

type CheckBoxType<T> = {
  label?: string;
  customPayload?: T;
  value?: string;
} & HTMLAttributes<HTMLInputElement> &
  CheckBoxBaseType;

type CheckBoxGroupType<T> = {
  className?: string;
  checkboxClassName?: string;
  /*@TODO реализовать */
  direction?: {
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

type checkboxBuilderType = "custom" | "default";

/** default | custom */
export function CheckInputBuilder<F extends checkboxBuilderType, T>(
  constructor: CheckboxCreatorType<T, F>
) {
  /** Creating base checkbox */
  const CheckBox: FC<CheckBoxType<T>> = (props) => {
    // const {control} = useFormContext()
    // const field = control.register(props.name);
    const field = props.control.register(props.name);

    return (
      <label className={cn(styles.container, props.className)}>
        <input
          type={props.inputType}
          className={cn(styles.checkbox_input, constructor.classNames.input)}
          {...field}
          onChange={(e: any) => {
            field.onChange(e);
            //   custom
          }}
          value={props.value}
        />
        {constructor?.customElement ? (
          // @ts-ignore
          React.createElement(constructor.customElement.component, {
            ...props.customPayload,
          })
        ) : (
          <div className={styles.icon}>
            {constructor.icons &&
              React.createElement(constructor.icons[props.inputType]?.checked, {
                className: cn(styles.checked_icon),
              })}
            {constructor.icons &&
              React.createElement(
                constructor.icons[props.inputType].unchecked,
                {
                  className: cn(styles.unchecked_icon),
                }
              )}
          </div>
        )}
        {props.label && <span className={styles.label}>{props.label}</span>}
      </label>
    );
  };

  /** Group of checkboxes */
  const CheckBoxGroup = (props: CheckBoxGroupType<T>) => {
    return (
      <div className={cn(styles.group, props.className)}>
        {props.options.map((item, index) => {
          return (
            <CheckBox
              inputType={props.inputType}
              control={props.control}
              name={props.name}
              customPayload={item.customPayload}
              value={item.value}
              label={item.label}
              className={props.checkboxClassName}
            />
          );
        })}
        {props.error && <div className={styles.error}>{props.error}</div>}
      </div>
    );
  };

  return {
    default: CheckBox,
    group: CheckBoxGroup,
  };
}
