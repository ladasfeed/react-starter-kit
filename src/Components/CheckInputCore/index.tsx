import React, { FC } from "react";
import cn from "classnames";
import styles from "./index.module.css";
import {
  checkboxBuilderMode,
  CheckboxCreatorType,
  CheckBoxGroupType,
  CheckBoxType,
} from "./types";

/** default | custom */
export function CheckInputBuilder<F extends checkboxBuilderMode, T>(
  constructor: CheckboxCreatorType<F, T>
) {
  /** Creating base checkbox */
  const CheckBox: FC<CheckBoxType<T>> = (props) => {
    const field = props.control.register(props.name);

    return (
      <label
        className={cn(
          styles.container,
          props.className,
          constructor.classNames.container
        )}
      >
        <input
          type={props.inputType}
          className={cn(styles.checkbox_input, constructor.classNames.input)}
          {...field}
          onChange={(e: any) => {
            field.onChange(e);
            props.onChange?.call({}, e);
          }}
          value={props.value}
        />
        {constructor?.customElement ? (
          // @ts-ignore
          React.createElement(constructor.customElement.component, {
            ...props.customPayload,
          })
        ) : (
          <div className={cn(styles.icon, constructor.classNames.icon)}>
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
        {props.label && (
          <span className={cn(styles.label, constructor.classNames.label)}>
            {props.label}
          </span>
        )}
      </label>
    );
  };

  /** Group of checkboxes */
  const CheckBoxGroup = (props: CheckBoxGroupType<T>) => {
    return (
      <div
        className={cn(
          styles.group,
          props.className,
          constructor.classNames.group
        )}
      >
        {props.options.map((item, index) => {
          return (
            <CheckBox
              key={index}
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
