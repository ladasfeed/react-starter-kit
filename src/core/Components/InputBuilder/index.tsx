import React, { ReactNode, useState } from "react";
import styles from "./index.module.css";
import { Controller } from "react-hook-form";
import cn from "classnames";
import NumberFormat from "react-number-format";
import {
  InputConstructorType,
  NumberInputPropsType,
  TextInputPropsType,
} from "./types";
import { InputWrapper } from "./wrapper";

function InputTextBuilder(builderProps: InputConstructorType) {
  const { classNames, icons } = builderProps;

  /**
   * Create input which uses to create more complex components by composition
   * */
  const Input = function InputText(inputProps: TextInputPropsType) {
    const { control, name, ...jsxAttr } = inputProps;
    const fieldProps = control.register(name);
    return (
      <InputWrapper builderProps={builderProps} inputProps={inputProps}>
        <input
          data-class="input"
          {...fieldProps}
          {...jsxAttr}
          className={cn(styles.input, classNames?.elements?.input, {
            [styles.input_readonly]: jsxAttr.readOnly,
          })}
          onChange={(e) => {
            fieldProps.onChange(e);
            if (jsxAttr.onChange) {
              jsxAttr.onChange(e);
            }
          }}
        />
      </InputWrapper>
    );
  };

  /**
   * @Input - default. Contains label, supports icons, error and basic styles.
   * @Lock - disabled by default with lock icon
   * @Password - contains logic with toggling input type with dynamic icons
   * @Editable - contains logic with toggling disabled/enabled state with dynamic icons
   * @CalendarInput - contains NumberFormat component, which needed to masking DatePicker
   * @Number - contains NumberFormat component with additional props for formatting and masking
   * */

  return {
    Default: Input,
    Lock: (props: TextInputPropsType) => {
      return (
        <Input
          {...props}
          disabled
          support={React.createElement(builderProps.icons.lock, {})}
        />
      );
    },
    Password: (props: TextInputPropsType) => {
      const [isOpen, setIsOpen] = useState(false);
      const icon = icons.eyeClosed;

      return (
        <Input
          {...props}
          type={isOpen ? "text" : "password"}
          support={React.createElement(icon, {
            onClick: () => setIsOpen(!isOpen),
            style: { cursor: "pointer" },
          })}
        />
      );
    },

    Editable: (props: TextInputPropsType) => {
      const [isEdit, setIsEdit] = useState(false);
      const icon = icons.edit;

      return (
        <Input
          {...props}
          disabled={!isEdit}
          support={React.createElement(icon, {
            onClick: () => setIsEdit(!isEdit),
            style: { cursor: "pointer" },
          })}
        />
      );
    },
    CalendarInput: (props: any) => {
      return (
        <InputWrapper builderProps={builderProps} inputProps={props}>
          <NumberFormat
            {...props}
            placeholder={"0"}
            className={cn(styles.input, classNames?.elements?.input)}
            mask={"_"}
            format={"##.##.####"}
          />
        </InputWrapper>
      );
    },
    Numeric: (props: NumberInputPropsType) => {
      return (
        <InputWrapper builderProps={builderProps} inputProps={props}>
          <Controller
            control={props.control}
            name={props.name}
            render={({ field }) => (
              <NumberFormat
                allowNegative={false}
                thousandSeparator={" "}
                mask={props.mask}
                format={props.format}
                {...props}
                className={cn(styles.input, classNames?.elements?.input)}
                placeholder={"0"}
                {...field}
              />
            )}
          />
        </InputWrapper>
      );
    },
    Wrapper: (
      inputProps: TextInputPropsType & {
        children?: ReactNode;
      }
    ) => (
      <InputWrapper inputProps={inputProps} builderProps={builderProps}>
        {inputProps.children}
      </InputWrapper>
    ),
  };
}

export default { InputTextBuilder };
