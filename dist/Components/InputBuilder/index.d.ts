import { AllHTMLAttributes, FC, ReactNode } from "react";
import { Control } from "react-hook-form";
import { NumberFormatProps } from "react-number-format";
declare type InputConstructorType = {
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
export declare type TextInputPropsType = {
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
declare function InputTextBuilder(builderProps: InputConstructorType): {
    Default: (inputProps: TextInputPropsType) => JSX.Element;
    Lock: (props: TextInputPropsType) => JSX.Element;
    Password: (props: TextInputPropsType) => JSX.Element;
    Editable: (props: TextInputPropsType) => JSX.Element;
    CalendarInput: (props: any) => JSX.Element;
    Numeric: (props: NumberFormatProps & TextInputPropsType) => JSX.Element;
};
declare const _default: {
    InputTextBuilder: typeof InputTextBuilder;
};
export default _default;
