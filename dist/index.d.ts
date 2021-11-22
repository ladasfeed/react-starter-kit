export declare const InputBuilder: (builderProps: {
    classNames?: {
        state?: {
            error?: string | undefined;
            locked?: string | undefined;
            loading?: string | undefined;
        } | undefined;
        elements?: {
            wrapper?: string | undefined;
            input?: string | undefined;
            label?: string | undefined;
            support?: string | undefined;
            error?: string | undefined;
        } | undefined;
    } | undefined;
    icons: {
        lock: import("react").FC<any>;
        eyeClosed: import("react").FC<any>;
        edit: import("react").FC<any>;
    };
}) => {
    Default: (inputProps: import("./Components/InputBuilder").TextInputPropsType) => JSX.Element;
    Lock: (props: import("./Components/InputBuilder").TextInputPropsType) => JSX.Element;
    Password: (props: import("./Components/InputBuilder").TextInputPropsType) => JSX.Element;
    Editable: (props: import("./Components/InputBuilder").TextInputPropsType) => JSX.Element;
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
