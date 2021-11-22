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

export const createErrorBoundaryProps = (componentName: string) => ({
  FallbackComponent: ErrorFallback,
  onError: (error: any, info: any) => {
    console.group(`COMPONENT ${componentName} ERROR`);
    console.error("ERROR INFORMATION", error);
    console.log("COMPONENTS STACK");
    console.info(info);
    console.groupEnd();
  },
});

export function createComponent<T>(name: string, component: FC<T>) {
  return withErrorBoundary(component, createErrorBoundaryProps(name));
}
