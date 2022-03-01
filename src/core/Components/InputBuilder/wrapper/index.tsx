import React, { FC } from "react";
import { InputConstructorType, TextInputPropsType } from "../types";
import cn from "classnames";
import styles from "../index.module.css";

/** A component with div wrapper, error, label, icons */
export const InputWrapper: FC<{
  inputProps: TextInputPropsType;
  builderProps: InputConstructorType;
}> = ({ builderProps, inputProps, children }) => {
  const { classNames, icons } = builderProps;

  return (
    <div
      className={cn(
        styles.wrapper,
        inputProps.className,
        {
          [styles["wrapper-error"]]: inputProps.error,
          [builderProps.classNames?.state?.error || ""]: inputProps.error,
          /**/
          [styles["wrapper--lock"]]: inputProps.readOnly,
          [builderProps.classNames?.state?.locked || ""]: inputProps.readOnly,
        },
        builderProps.classNames?.elements?.wrapper
      )}
      style={inputProps.wrapperStyle}
    >
      {children}
      {inputProps.placeholder && (
        <label
          htmlFor={inputProps.name}
          className={cn(styles.label, classNames?.elements?.label)}
        >
          {inputProps.placeholder}
        </label>
      )}
      {(inputProps.support || inputProps.readOnly) && (
        <div className={cn(styles.support, classNames?.elements?.support)}>
          {inputProps.support
            ? inputProps.support
            : inputProps.readOnly && icons?.lock
            ? React.createElement(icons?.lock, {})
            : ""}
        </div>
      )}
      {Boolean(inputProps.error) && (
        <div
          title={inputProps.error}
          className={cn(styles.error, classNames?.elements?.error)}
        >
          {inputProps.error}
        </div>
      )}
    </div>
  );
};
