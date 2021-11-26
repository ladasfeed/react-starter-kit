import { AxiosResponse } from "axios";

export function apiBuilder<T, F>(
  method: (props: T) => Promise<F>
): (apiProps: T) => Promise<F> {
  return async (apiProps: T) => {
    try {
      return await method(apiProps);
    } catch (e: any) {
      throw await e.response;
    }
  };
}
