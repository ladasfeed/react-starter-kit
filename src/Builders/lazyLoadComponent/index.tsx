// import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
const loadable = require("@loadable/component");

export default (fb: JSX.Element | undefined) => {
  return (importCb: () => PromiseLike<any>) => {
    return loadable(() => pMinDelay(importCb(), 800), {
      fallback: fb,
    });
  };
};
