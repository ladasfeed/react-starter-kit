import { withErrorBoundary } from "react-error-boundary";
import React, { FC } from "react";

const createErrorBoundaryProps = (fb: FC<any>) => ({
  FallbackComponent: fb,
  onError: (error: any, info: any) => {
    console.error("ERROR INFORMATION", error);
    console.log("COMPONENTS STACK");
    console.info(info);
    console.groupEnd();
  },
});

export function createComponentBuilder(fb: FC<any>) {
  return function <T>(component: FC<T>) {
    return withErrorBoundary(component, createErrorBoundaryProps(fb));
  };
}
