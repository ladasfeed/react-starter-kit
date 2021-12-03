import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
// const loadable = require("@loadable/component");

export const lazyLoadBuilder = (
  fb: JSX.Element | undefined,
  delay?: number
) => {
  return (importCb: () => PromiseLike<any>) => {
    return loadable(() => pMinDelay(importCb(), delay || 800), {
      fallback: fb,
    });
  };
};
