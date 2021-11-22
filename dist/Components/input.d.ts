/// <reference types="react" />
/// <reference types="react-number-format" />
export declare const Input: {
    Default: (inputProps: import("./InputBuilder/index").TextInputPropsType) => JSX.Element;
    Lock: (props: import("./InputBuilder/index").TextInputPropsType) => JSX.Element;
    Password: (props: import("./InputBuilder/index").TextInputPropsType) => JSX.Element;
    Editable: (props: import("./InputBuilder/index").TextInputPropsType) => JSX.Element;
    CalendarInput: (props: any) => JSX.Element;
    Numeric: (props: import("react-number-format").NumberFormatProps & {
        mask?: string | undefined;
        support?: import("react").ReactNode | import("react").ReactNode[];
        control: import("react-hook-form").Control<any, object>;
        name: any;
        placeholder?: string | undefined;
        type?: string | undefined;
        isLoading?: boolean | undefined;
        value?: string | undefined;
        error?: string | undefined;
    } & import("react").AllHTMLAttributes<HTMLInputElement>) => JSX.Element;
};
