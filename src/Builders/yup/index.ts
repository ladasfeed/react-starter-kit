import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type yupBuilderPropsType<T> = {
  text: {
    req: string;
    email: string;
    min: (val: number) => string;
    max: (val: number) => string;
  };
  customSchemas: T;
};
export function yupBuilder<T>(constructor: yupBuilderPropsType<T>) {
  const yupText = {
    req: constructor.text.req,
    email: constructor.text.email,
    min: constructor.text.min,
    max: constructor.text.max,
  };

  return {
    text: yupText,
    instance: yup,
    resolver: yupResolver,
    create: (shape: any) => yup.object().shape(shape),

    schemas: {
      required() {
        return yup.string().required(yupText.req).typeError(yupText.req);
      },

      email() {
        return yup
          .string()
          .required(yupText.req)
          .email(yupText.email)
          .typeError(yupText.req);
      },

      min(val: number) {
        return yup
          .string()
          .required(yupText.req)
          .min(val, yupText.min(val))
          .typeError(yupText.req);
      },

      max(val: number) {
        return yup
          .string()
          .required(yupText.req)
          .max(val, yupText.max(val))
          .typeError(yupText.req);
      },

      ...constructor.customSchemas,
    },
  };
}
