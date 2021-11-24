import { withErrorBoundary } from "react-error-boundary";
import React, { FC } from "react";

const ErrorFallback: FC<any> = ({ error, resetErrorBoundary }: any) => {
  return (
    <div>
      <p>В модуле произошла ошибка, приносим свои извинения</p>
      <pre>Наши специалисты уже работают над этим.</pre>
    </div>
  );
};

export const createErrorBoundaryProps = (fb: FC<any>) => ({
  FallbackComponent: fb,
  onError: (error: any, info: any) => {
    console.error("ERROR INFORMATION", error);
    console.log("COMPONENTS STACK");
    console.info(info);
    console.groupEnd();
  },
});

export function createComponentBuilder(fb: FC<any>) {
  return function <T>(name: string, component: FC<T>) {
    return withErrorBoundary(component, createErrorBoundaryProps(fb));
  };
}
