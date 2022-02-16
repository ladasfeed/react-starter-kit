import { AllHTMLAttributes, CSSProperties, FC, ReactNode } from "react";
import { Control } from "react-hook-form";
import { NumberFormatPropsBase } from "react-number-format";

/** A type for the factory function */
export type InputConstructorType = {
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

/** A type for the factory function */
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
  wrapperStyle?: CSSProperties;
} & AllHTMLAttributes<HTMLInputElement>;

/** A type for the NumberInput */
export type NumberInputPropsType = NumberFormatPropsBase & {
  control: Control<any>;
  name: string;
  support?: ReactNode | Array<ReactNode>;
  isLoading?: boolean;
  error?: string;
  mask?: any;
  value?: any;
};
