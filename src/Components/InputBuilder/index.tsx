import React, { AllHTMLAttributes, FC, ReactNode, useState } from "react";
import styles from "./index.module.css";
import { Control, Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import NumberFormat, { NumberFormatProps, NumberFormatPropsBase } from "react-number-format";

type InputConstructorType = {
  classNames?: {
    state?: {
      error?: string;
      locked?: string;
      loading?: string;
    };
    elements?: {
      wrapper?: string;
      input?: string;
      label?: string;
      support?: string;
      error?: string;
    };
  };
  icons: {
    lock: FC<any>;
    eyeClosed: FC<any>;
    edit: FC<any>;
  };
};

export type TextInputPropsType = {
  mask?: string;
  support?: ReactNode | Array<ReactNode>;
  control: Control<any>;
  name: any;
  placeholder?: string;
  type?: string;
  isLoading?: boolean;
  value?: string;
  error?: string;
} & AllHTMLAttributes<HTMLInputElement>;

const InputSupports: FC<{
  builderProps: InputConstructorType;
  componentProps: TextInputPropsType;
}> = ({ componentProps, builderProps }) => {
  const { classNames, icons } = builderProps;
  return (
    <>
      {componentProps.placeholder && (
        <label
          htmlFor={componentProps.name}
          className={cn(styles.label, classNames?.elements?.label)}
        >
          {componentProps.placeholder}
        </label>
      )}
      {(componentProps.support || componentProps.readOnly) && (
        <div className={cn(styles.support, classNames?.elements?.support)}>
          {componentProps.support
            ? componentProps.support
            : componentProps.readOnly && icons?.lock
            ? React.createElement(icons?.lock, {})
            : ""}
        </div>
      )}
      {Boolean(componentProps.error) && (
        <div
          title={componentProps.error}
          className={cn(styles.error, classNames?.elements?.error)}
        >
          {componentProps.error}
        </div>
      )}
    </>
  );
};

const InputWrapper: FC<{
  inputProps: TextInputPropsType;
  builderProps: InputConstructorType;
}> = (props) => {
  const { builderProps, inputProps } = props;
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
    >
      {props.children}
    </div>
  );
};

function InputTextBuilder(builderProps: InputConstructorType) {
  const { classNames, icons } = builderProps;

  /**
   * Create input which uses to create more complex components by composition
   * */
  const Input = function InputText(inputProps: TextInputPropsType) {
    const { control, name, ...jsxAttr } = inputProps;
    // const {control} = useFormContext()
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
        <InputSupports
          componentProps={inputProps}
          builderProps={builderProps}
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
          <InputSupports componentProps={props} builderProps={builderProps} />
        </InputWrapper>
      );
    },
    Numeric: (props: NumberFormatPropsBase & TextInputPropsType) => {
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
          <InputSupports componentProps={props} builderProps={builderProps} />
        </InputWrapper>
      );
    },
  };
}

export default { InputTextBuilder };
